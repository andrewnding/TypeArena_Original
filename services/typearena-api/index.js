import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import config from 'config/index';
import { connectionMiddleware } from 'middleware/sql';
import { configureTypes } from 'middleware/configureTypes';
import { authenticationMiddleware } from 'middleware/authentication';
import userRoutes from 'routes/user';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'dev session secret',
    resave: false,
    saveUninitialized: false,
}))
app.use(connectionMiddleware);
app.use(configureTypes);
app.use(passport.initialize());
app.use(passport.session());
app.use(authenticationMiddleware);

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.use('/', userRoutes);