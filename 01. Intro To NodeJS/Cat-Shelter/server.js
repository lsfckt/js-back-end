const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const cats = require('./data/cats');
const options = require('./data/options');
const render = require('./views/render');

const port = 7000;

const views = {
    home: './views/home.html',
    style: './static/styles/style.css',
    addCat: './views/addCat.html',
    cat: './views/partials/cats.html',
    breed: './views/partials/options.html',
    addBreed: './views/addBreed.html',
}

http.createServer((req, res) => {
    const catView = views.cat;
    const breedView = views.breed;

    if (req.url === '/') {
        render(catView, breedView, { cats, options }, (err, { firstHtmlResult, secondHtmlResult }) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            render(catView, breedView, [{ cats: firstHtmlResult, options: secondHtmlResult }], (err, { firstResult, secondResult }) => {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write({ firstResult, secondResult });
                res.end();
            });
        });

    } else if (req.url === '/static/styles/style.css') {
        fs.readFile(views.style, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            res.write(result);
            res.end();
        });

    } else if (req.url === '/cats/add-breed' && req.method === 'GET') {
        fs.readFile(views.addBreed, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(result);
            res.end();
        });
    } else if (req.url === '/cats/add-breed' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('close', () => {

            const parsedBody = querystring.parse(body);

            options.push(parsedBody);

            res.writeHead(302, {
                'location': '/'
            });
            res.end();
        });

    } else if (req.url === '/cats/add-cat' && req.method === 'GET') {
        fs.readFile(views.addCat, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(result);
            res.end();
        });

    } else if (req.url === '/cats/add-cat' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('close', () => {
            const parsedBody = querystring.parse(body);

            parsedBody.id = cats[cats.length - 1].id + 1;

            cats.push(parsedBody);

            res.writeHead(302, {
                'location': '/'
            });
            res.end();
        });

    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write('<img src="https://blog.fluidui.com/assets/images/posts/imageedit_1_9273372713.png">');
        res.end();
    }
}).listen(port);


console.log(`Server listening on port ${port}...`);