const router = require('express').Router();

const authService = require('../services/auth-service');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
    } catch (error) {
        console.log(error.message);
        return res.redirect('/register');
    }

    res.redirect('/login');

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
});

module.exports = router;