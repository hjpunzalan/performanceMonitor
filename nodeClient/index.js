//  the node program that captures local perforamance data and sends it up top the socket.io server
// Req:
//  - farmhash
//  - socket.io-client
const os = require('os');
const cpu = os.cpus();

// CPU load (current)
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
const cpuModel = cpu[0].model;
// - number of cores
const numCores = cpu.length;
// - clock speed
const cpuSpeed = cpu[0].speed;
