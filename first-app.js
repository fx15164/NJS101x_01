const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('THis alway run!');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Send</button></form>');
});

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from express</h1>');
});

const server = http.createServer(app);

server.listen(3000);
