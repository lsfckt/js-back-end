const router = require('express').Router();

const movieService = require('../services/movie-service');
const castService = require('../services/cast-service');
const { getErrorMessage } = require('../utils/errorUtils');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
})

router.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    newMovie.owner = req.user?._id;

    try {
        await movieService.create(newMovie);
        res.redirect('/');

    } catch (error) {
        message = getErrorMessage(error);
        res.status(400).render('create', { ...newMovie, error: message });
    }
});

router.get('/movie/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId).lean();
        const isOwner = movie.owner == req.user?._id;

        movie.rating = new Array(Number(movie.rating)).fill(true);

        res.render('movies/details', { movie, isOwner });

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
        await movieService.update(movieId, req.body);
        res.redirect(`/movie/${movieId}/edit`);

    } catch (error) {
        console.log(error);
        res.redirect(`/movie/${movieId}/edit`);
    }
});

router.get('/movie/:movieId/delete', isAuth, async (req, res) => {
    await movieService.delete(req.params.movieId);

    res.redirect('/');
});
module.exports = router;