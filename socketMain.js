// Handles the main socket that connects server to Node Client and UI
// Node client generate the performance data required per machine
// The UI consumes this data communicated through the socket Main

const mongoose = require('mongoose');
mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('connection to DB was successful');
	});

const Machine = require('./models/Machine');

function socketMain(io, socket) {
	let macA;

	socket.on('clientAuth', key => {
		if (key === 'testsdsdsdsds') {
			// valid nodeClient
			socket.join('clients');
		} else if (key === '23sdsad232') {
			// valid UI client
			socket.join('ui');
			console.log('A react client has joined');
			// For all machines assume they are offline when first loaded
			Machine.find({}, (err, docs) => {
				docs.forEach(machine => {
					// on first load, assume all machines are offline
					machine.isActive = false;
					io.to('ui').emit('data', machine);
				});
			});
		} else {
			// an invalid client joined
			socket.disconnect(true);
		}
	});

	//listens to machine going offline
	socket.on('disconnect', () => {
		// macA available from scope
		Machine.find({ macA }, (err, docs) => {
			if (docs.length > 0) {
				// Send one last emit to React
				docs[0].isActive = false;
				io.to('ui').emit('data', docs[0]);
			}
		});
	});

	// machine connected, check to see if its new
	// if new, add it
	// This for react to see if machine has been offline or is new
	socket.on('initPerfData', async data => {
		// update function scope variable
		macA = data.macA || 'test';
		// Check mongo database
		const mongooseResponse = await checkAndAdd(data);
		console.log(mongooseResponse);
	});

	socket.on('perfData', data => {
		console.log('Tick...');
		// Sends data to UI REACT client
		io.to('ui').emit('data', data);
	});
}

async function checkAndAdd(data) {
	// need to be async because it relates to dbs
	try {
		const machine = await Machine.findOne({
			macA: data.macA
		});

		if (machine === null) {
			// add data if not in db
			let newMachine = new Machine(data);
			newMachine.save();
			return 'added';
		} else {
			return 'found';
		}
	} catch (error) {
		console.error(error);
	}
}

module.exports = socketMain;
