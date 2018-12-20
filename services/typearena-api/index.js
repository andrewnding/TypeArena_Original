import express from 'express';
const app = express();

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
});

app.get('/', (req, res) => {
    res.send('Hello world!!');
});