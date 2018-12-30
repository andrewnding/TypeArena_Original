import express from 'express';
import config from 'config/index';
import { connectionMiddleware } from 'middleware/sql';
import { configureTypes } from 'middleware/configureTypes';

const app = express();

// Middlewares
app.use(connectionMiddleware);
app.use(configureTypes);

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});