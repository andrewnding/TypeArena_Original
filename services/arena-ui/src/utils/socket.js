import socket from 'socket.io-client';
const io = socket('http://localhost:8001');

export const updateInputSocket = text => {
    io.emit('updateInputSocket', text)
}