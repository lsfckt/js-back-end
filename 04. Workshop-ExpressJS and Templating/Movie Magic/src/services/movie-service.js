const Movie = require('../models/Movie');

exports.create = (movieData) => {

    return Movie.create(movieData);
}

exports.getAll = () => {
    return Movie.find({});
}

exports.getOne = (movieId) => {
    return Movie.findById(movieId);
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
