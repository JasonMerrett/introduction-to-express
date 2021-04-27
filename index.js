const express = require('express');
const app = express();
const port = 3000;
const users = require('./users');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', users);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});