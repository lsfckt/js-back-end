const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const movieController = require('./controllers/movie-controller');
const castController = require('./controllers/cast-controller');
const authController = require('./controllers/auth-controller');

router.use(homeController);
router.use(movieController);
router.use('/cast', castController);
router.use('/auth', authController);

router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;