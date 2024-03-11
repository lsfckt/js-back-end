const router = require('express').Router();

const movieService = require('../services/movie-service');
const castService = require('../services/cast-service');

const Movie = require('../models/Movie');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
})

router.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    newMovie.owner = req.user._id;

    try {
        await movieService.create(newMovie);
    } catch (error) {
        console.log(error.message);
        res.redirect('/create');
    }

    res.redirect('/');
});

router.get('/movie/:movieId', async (req, res) => {
    const movieId = req.params.movieId;


    try {
        const movie = await movieService.getOne(movieId).lean();
        // const casts = await castService.getByIds(movie.casts).lean();

        movie.rating = new Array(Number(movie.rating)).fill(true);

        res.render('movies/details', { movie });

    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});

router.get('/movie/:movieId/attach', async (req, res) => {

    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('movies/attach', { ...movie, casts });
});

router.post('/movie/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/attach`);
});

router.get('/movie/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId).lean();
        res.render('movies/edit', { movie });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

router.post('/movie/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        await Movie.findByIdAndUpdate(movieId, req.body);
        res.redirect(`/movie/${movieId}/edit`);

    } catch (error) {
        console.log(error);
        res.redirect(`/movie/${movieId}/edit`);
    }
});

module.exports = router;