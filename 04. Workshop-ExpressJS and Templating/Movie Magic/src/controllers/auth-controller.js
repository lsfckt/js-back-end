const router = require('express').Router();

const authService = require('../services/auth-service');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

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
        await authService.login(email, password);
    } catch (error) {
        console.log(error);
        return res.redirect('/auth/login');
    }

    res.redirect('/');
});

module.exports = router;