//  the node program that captures local perforamance data and sends it up top the socket.io server
// Req:
//  - farmhash
//  - socket.io-client
const os = require('os');
const io = require('socket.io-client');
let socket = io('http://localhost:8000');

socket.on('connect', () => {
	// To identify this machine to whomever is connected using network interfaces (MAC)
	const nI = os.networkInterfaces();
	let macA;
	// looop through all the nI for this machine and find a non-internal one
	// internal to true prevents internet access to the machine
	for (let key in nI) {
		if (!nI[key][0].internal)
			// grab first element as its the same
			macA = nI[key][0].mac;
		break;
	}

	// client auth with single key value for testing
	socket.emit('clientAuth', 'testsdsdsdsds');

	// Send initial performance data
	performanceData().then(allPerformanceData => {
		allPerformanceData.macA = macA;
		socket.emit('initPerfData', allPerformanceData);
	});

	// start sending over data on interval
	let perfDataInterval = setInterval(() => {
		// set Interval repeats the callback
		performanceData().then(allPerformanceData => {
			allPerformanceData.macA = macA;
			socket.emit('perfData', allPerformanceData);
		});
	}, 1000);
	// Stops all interval when disconnecting otherwise it will continue
	socket.on('disconnect', () => {
		clearInterval(perfDataInterval);
	});
});

async function performanceData() {
	// CPU load (current)
	const cpus = os.cpus();
	// Memory usage (total and free) - percentage
	const freeMem = os.freemem();
	const totalMem = os.totalmem();
	const usedMem = totalMem - freeMem;
	const memUsage = Math.floor((usedMem / totalMem) * 100) / 100; // round to nearest two decimal places
	// OS type
	let osType = os.type();
	switch (osType) {
		case 'Darwin':
			osType = 'Mac';
			break;
		case 'Windows_NT':
			osType = 'Windows';
			break;
		default:
			break;
	}
	// uptime
	const upTime = os.uptime();
	// CPU info -- logical cores refer to threads
	// model,speed same in all cores
	// - type
	const cpuModel = cpus[0].model;
	// - number of cores
	const numCores = cpus.length;
	// - clock speed
	const cpuSpeed = cpus[0].speed;
	const cpuLoad = await getCpuLoad();
	const isActive = true;
	return {
		freeMem,
		totalMem,
		usedMem,
		memUsage,
		osType,
		upTime,
		cpuModel,
		numCores,
		cpuSpeed,
		cpuLoad,
		isActive
	};
}
// cpus is all cores, need the average of all cores which gives cpu average
function cpuAverage() {
	// refresh cpu data
	const cpus = os.cpus();
	// get ms in each mode, BUT this number is since reboot
	// Get average now and after 100ms then compare
	// compare total time from idle to obtain total running time
	let idleMs = 0;
	let totalMs = 0;
	// Loop through each core
	cpus.forEach(core => {
		// loop through each property of current core
		for (type in core.times) {
			totalMs += core.times[type];
		}
		idleMs += core.times.idle;
	});

	return {
		idle: idleMs / cpus.length,
		total: totalMs / cpus.length
	};
}

// Time property is since boot,
// So need current time, and 100ms from now time to obtain current load based on time interpolation
function getCpuLoad() {
	return new Promise((resolve, reject) => {
		const start = cpuAverage();
		setTimeout(() => {
			const end = cpuAverage();
			const idleDifference = end.idle - start.idle;
			const totalDifference = end.total - start.total;
			// calc the % of average cpu on all cores used based on idle time when its not running
			const perecentageCpu =
				100 - Math.floor((100 * idleDifference) / totalDifference);
			// Resolves promise and return percentageCPU
			resolve(perecentageCpu);
		}, 100);
	});
}
