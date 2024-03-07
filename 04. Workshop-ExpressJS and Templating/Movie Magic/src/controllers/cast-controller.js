const router = require('express').Router();

const castService = require('../services/cast-service');

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const newCast = req.body;

    try {
        await castService.createCast(newCast);
    } catch (error) {
        console.log(error.message);
        res.redirect('/create/cast');
    }

    res.redirect('/');
});

module.exports = router;