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
    res.send({ text: 'October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.' });
});