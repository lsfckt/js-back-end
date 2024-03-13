const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
// const { body } = require('express-validator');

const app = express();
const port = 3000;
const saltRounds = 9;
const pass = '123';

const payloads = { _id: '1234567', username: 'lsfckt' };
const options = { expiresIn: '2min' };
const secret = 'mySecret';
const token = jwt.sign(payloads, secret, options);

app.use(express.urlencoded({ extended: false }));

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
        bcrypt.compare(pass, hash, (err, res) => {
            console.log(res);
        });
    });
});



app.listen(port, () => console.log('Server is listening on http://localhost:3000...'));

app.use(cookieParser());

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));

app.get('/setSession', (req, res) => {
    req.session.message = 'hello';
    res.end('Session set');
});

app.get('/readSession', (req, res) => {
    res.json(req.session);
});

//VALIDATION
app.get('/', (req, res) => {
    res.send(`<form method="POST">
    <div>
        <div>
            <label for="email">Email</label>
            <input type="text" name="email"></input>
        </div>
        <div>
            <label for="password">Passowrd</label>
            <input type="password" name="password"></input>
        </div>
        <div>
            <input type="submit" value="Click"></button>
        </div>
    </div>
</form>`);
});

app.post('/', (req, res) => {
    const body = req.body;
    const isEmail = validator.isEmail(body.email)

    res.json(req.body.email);
    res.end();
});

app.get('/setCookie', (req, res) => {
    res.cookie('token', token);
    res.end('Cookie set');
});

app.get('/readCookie', (req, res) => {
    res.json(req.cookies);
});

app.get('/getToken', (req, res) => {
    const t = req.cookies['token'];

    const decodedToken = jwt.verify(token, secret);
});
