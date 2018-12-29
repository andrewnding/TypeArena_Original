import express from 'express';
import http from 'http';
import socket from 'socket.io';

import config from './config/index.js';

const app = express();
const server = http.Server(app);
const io = socket(server, { origins: 'http://localhost:8080'});

server.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/get_arena_text', (req, res) => {
    res.send({ text: 'October arrived, spreading a damp chill over the grounds and into the castle.' });
});

io.on('connection', client => {
    console.log('a user connected')

    client.on('updateInputSocket', text => {
        console.log('updatingInputSocket', text)
    })
});