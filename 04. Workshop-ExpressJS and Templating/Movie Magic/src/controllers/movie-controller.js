const router = require('express').Router();

const movieService = require('../services/movie-service');
const castService = require('../services/cast-service');

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

router.get('/movie/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const movie = await movieService.getOne(movieId).lean();

        movie.rating = new Array(Number(movie.rating)).fill(true);

        res.render('details', { movie });

    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});

router.get('/movie/:movieId/attach', async (req, res) => {

    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('movie/attach', { ...movie, casts });
});

router.post('/movie/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;
    const movie = await movieService.getOne(req.params.movieId);

    movie.casts.push(castId);

    await movie.save();

    res.redirect(`/movie/${movie._id}/attach`);
});

module.exports = router;