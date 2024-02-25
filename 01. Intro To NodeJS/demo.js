const http = require('http');
const port = 5000;

http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.write('Hello')
    res.end();

}).listen(port);

console.log('My first server listenig on port 5000');