const router = require('express').Router();
const mongoose = require('mongoose');

const authService = require('../services/auth-service');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (error) {
        const message = getErrorMessage(error);

        return res.render('auth/register', { ...userData, error: message });
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