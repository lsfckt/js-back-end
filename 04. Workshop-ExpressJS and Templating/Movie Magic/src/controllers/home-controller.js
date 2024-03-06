const router = require('express').Router();

const movieService = require('../services/movie-service');

router.get('/', async (req, res) => {

    try {
        let movies = await movieService.getAll().lean();

        movies === undefined ? res.render('home') : res.render('home', { movies });

    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }

});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;
    let movieResult = await movieService.search(title, genre, year).lean();

    res.render('search', { movies: movieResult, title, genre, year });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;