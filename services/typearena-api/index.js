import express from 'express';
import config from 'config/index';
import { connection } from 'middleware/sql';

const app = express();

connection.connect()

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
    connection.query('select * from users', (err, rows, fields) => {
        console.log(rows)
    })
});