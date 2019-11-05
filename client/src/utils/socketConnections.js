import io from 'socket.io-client';
let socket = io.connect('/');

socket.emit('clientAuth', '23sdsad232');

console.log(socket);

export default socket;
