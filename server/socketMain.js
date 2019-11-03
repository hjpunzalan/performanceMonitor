function socketMain(io, socket) {
	// console.log('Socket Main is here!', socket.id);

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

	socket.on('perfData', data => {
		console.log(data);
	});
}

module.exports = socketMain;
