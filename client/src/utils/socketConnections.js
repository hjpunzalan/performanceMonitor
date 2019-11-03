import io from 'socket.io-client';
let socket = io.connect('http://localhost:8000');

socket.emit('clientAuth', '23sdsad232');

console.log(socket);

export default socket;
