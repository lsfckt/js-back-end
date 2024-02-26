const router = require('express').Router();

const movieService = require('../services/movie-service');

router.get('/create', (req, res) => {
    res.render('create');
})


router.post('/create', (req, res) => {

    const newMovie = req.body;
    movieService.create(newMovie);

    res.redirect('/');
});

module.exports = router;