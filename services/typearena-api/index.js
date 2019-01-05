import express from 'express';
import bodyParser from 'body-parser';

import config from 'config/index';
import { connectionMiddleware } from 'middleware/sql';
import { configureTypes } from 'middleware/configureTypes';
import userRoutes from 'routes/user';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectionMiddleware);
app.use(configureTypes);

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.use('/', userRoutes);