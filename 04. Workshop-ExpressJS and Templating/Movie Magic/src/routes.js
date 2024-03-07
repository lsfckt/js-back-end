const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const movieController = require('./controllers/movie-controller');
const castController = require('./controllers/cast-controller');

router.use(homeController);
router.use(movieController);
router.use('/cast', castController);

router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;