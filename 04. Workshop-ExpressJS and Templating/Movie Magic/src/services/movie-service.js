const Movie = require('../models/Movie');

exports.create = (movieData) => {

    return Movie.create(movieData);
}

exports.getAll = () => {
    return Movie.find({});
}

exports.getOne = (movieId) => {
    return Movie.findById(movieId).populate('casts');
}

exports.search = (title, genre, year) => {
    let query = Movie.find();

    if (title) {
        query = query.find({ title: new RegExp(title, 'i') });
    }

    if (genre) {
        query = query.find({ genre: genre.toLowerCase() });
    }

    if (year) {
        query = query.find({ year });
    }

    return query;
}

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);

        // TODO: validate castId if exists
    movie.casts.push(castId);

    return movie.save();
};
