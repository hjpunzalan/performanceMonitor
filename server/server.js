// entrypoint for our cluster which will make workers and the workers will do the Socket.io handling
// require sticky session to handle multiple processes which could use long polling

const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
const helmet = require('helmet');
const socketMain = require('./socketMain');

const port = 3000;
const num_processes = require('os').cpus().length;
// check to see if it's running -- redis-cli monitor
const io_redis = require('socket.io-redis');
const farmhash = require('farmhash');

if (cluster.isMaster) {
	// This stores our workers. We need to keep them to be able to reference
	// them based on source IP address. It's also useful for auto-restart,
	// for example.
	let workers = [];

	// Helper function for spawning worker at index 'i'.
	let spawn = function(i) {
		workers[i] = cluster.fork();

		// Optional: Restart worker on exit
		workers[i].on('exit', function(code, signal) {
			// console.log('respawning worker', i);
			spawn(i);
		});
	};

	// Spawn workers.
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}

	// Helper function for getting a worker index based on IP address.
	// This is a hot path so it should be really fast. The way it works
	// is by converting the IP address to a number by removing non numeric
	// characters, then compressing it to the number of slots we have.
	//
	// Compared against "real" hashing (from the sticky-session code) and
	// "real" IP number conversion, this function is on par in terms of
	// worker index distribution only much faster.
	const worker_index = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
	};

	// in this case, we are going to start up a tcp connection via the net
	// module INSTEAD OF the http module. Express will use http, but we need
	// an independent tcp port open for cluster to work. This is the port that
	// will face the internet
	const server = net.createServer({ pauseOnConnect: true }, connection => {
		// We received a connection and need to pass it to the appropriate
		// worker. Get the worker for this connection's source IP and pass
		// it the connection.
		let worker = workers[worker_index(connection.remoteAddress, num_processes)];
		worker.send('sticky-session:connection', connection);
	});
	server.listen(port);
	console.log(`Master listening on port ${port}`);
} else {
}
