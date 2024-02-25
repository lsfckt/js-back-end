const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const dogs = [
    {
        name: '<p>Ayra</p>',
        breed: 'Labrador',
    },

    {
        name: 'Roshko',
        breed: 'Mini-Poodle',
    }
]

const port = 3000;

const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);

app.set('view engine', '.hbs');

// app.use(express.static('public'));
// app.use('/static', express.static('public'));
// app.use('/static', express.static('__dirname' + '/public'));

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!')
})

app.get('/', function (req, res) {
    res.render('test', { dogs });
});

app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;

    let userExist = 1;

    if (userExist === 2) {
        res.redirect('/login');
    } else {
        next();
    }

})

app.get('/users/:id', (req, res) => {
    res.send('Working');
});

app.listen(port, () => console.log(`Express running on port ${port}...`));