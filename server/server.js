// entrypoint for our cluster which will make workers and the workers will do the Socket.io handling
// require sticky session to handle multiple processes which could use long polling

const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
