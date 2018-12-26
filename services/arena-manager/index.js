import express from 'express';
import config from './config/index.js';

const app = express();

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/get_arena_text', (req, res) => {
    res.send({ text: 'October arrived, spreading a damp chill over the grounds and into the castle.' });
});