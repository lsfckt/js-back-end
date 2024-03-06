const router = require('express').Router();

const movieService = require('../services/movie-service');

router.get('/create', (req, res) => {
    res.render('create');
})


router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);
    } catch (error) {
        console.log(error.message);
        res.redirect('/create');
    }

    res.redirect('/');
});

router.get('/movie/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getOne(movieId);

    movie.rating = new Array(Number(movie.rating)).fill(true);

    res.render('details', { movie });
});

module.exports = router;