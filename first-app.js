const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if(url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="post"><input type="text"/><button>Send</button></form></body>')
        res.write('<html>');
        return res.end();
    }
    
    if(url == '/message' && method === 'POST') {
        fs.writeFileSync('message', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Nodejs server!</></body>')
    res.write('<html>');
    res.end();
})

server.listen(3000);
