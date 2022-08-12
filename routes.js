const fs = require('fs');

function requestHandler(req, res) {
    const { url, method } = req;

    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button>Send</button></form></body>')
        res.write('<html>');
        return res.end();
    }

    if (url == '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message', message);
        })
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
}

module.exports.handler = requestHandler;