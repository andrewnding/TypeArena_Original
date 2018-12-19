const express = require('express');
const app = express();
const config = require('./config/config')

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});