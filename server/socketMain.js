const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/perfData', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const Machine = require('./models/Machine');

function socketMain(io, socket) {
	let macA;

	socket.on('clientAuth', key => {
		if (key === 'testsdsdsdsds') {
			// valid nodeClient
			socket.join('clients');
		} else if (key === '23sdsad232') {
			socket.join('ui');
			console.log('A react client has joined');
		} else {
			// an invalid client joined
			socket.disconnect(true);
		}
	});

	// machine connected, check to see if its new
	// if new, add it
	socket.on('initPerfData', async data => {
		// update function scope variable
		macA = data.macA;
		// Check mongo database
		const mongooseResponse = await checkAndAdd(data);
		console.log(mongooseResponse);
	});

	socket.on('perfData', data => {
		console.log('Tick...');
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
