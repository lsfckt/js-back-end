const http = require('http');
const homeTemplate = require('./views/home.html');
const addCatTemplate = require('./views/addCat.html');
const siteCss = require('./views/site.css');

const cats = [
    {
        id: 1,
        name: 'Tommy',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        name: 'Navcho',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Persian Cat',
        description: 'Nebuchadnezzar II',
    },
    {
        id: 3,
        name: 'Sisa',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
    
        res.write(homeTemplate(cats));
        res.end();
    } else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        });

        res.write(siteCss);
        res.end();
    } else if (req.url === '/cats/add-cat') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
    
        res.write(addCatTemplate);
        res.end();
    } else {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
    
        res.write('<h1>404</h1>');
        res.end();
    }
});

server.listen(5000);
console.log('Server is listening on port 5000...');