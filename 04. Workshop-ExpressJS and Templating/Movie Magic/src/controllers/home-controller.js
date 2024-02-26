const router = require('express').Router();

const movieService = require('../services/movie-service');

router.get('/', (req, res) => {

    let movies = movieService.getAll();

    movies.length < 1 ? res.render('home') : res.render('home', { movies });

});

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;