const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method, req.headers);

    if(req.url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="post"><input type="text"/><button>Send</button></form></body>')
        res.write('<html>');
        return res.end();
    }
    //
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Nodejs server!</></body>')
    res.write('<html>');
    res.end();
})

server.listen(3000);
