import socket from 'socket.io-client';
const io = socket('http://localhost:8001');

export const completeWord = text => {
    io.emit('completeWord', text)
}