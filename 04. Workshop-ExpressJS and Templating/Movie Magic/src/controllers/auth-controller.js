const router = require('express').Router();

const User = require('../models/User');
const authService = require('../services/auth-service');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    const user = User.findOne({ email: userData.email });

    if(user) {
        throw new Eroor('Email already exist!');
    }

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/auth/register');
    }

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

    } catch (error) {
        console.log(error);
        return res.redirect('/auth/login');
    }

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;