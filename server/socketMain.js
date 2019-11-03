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
		} else if (key === '23232') {
			socket.join('clients');
		} else {
			// an invalid client joined
			socket.disconnect(true);
		}
	});

	// machine connected, check to see if its new
	// if new, add it
	socket.on('initPerfData', data => {
		// update function scope variable
		macA = data.macA;
	});

	socket.on('perfData', data => {
		console.log(data);
	});
}

module.exports = socketMain;
