const Movie = require('../models/Movie');

exports.create = (movieData) => {

    return Movie.create(movieData);
}

exports.getAll = () => {
    return Movie.find({});
}

exports.getOne = (movieId) => {
    const movie = movies.find(movie => movie._id == movieId);

    return movie;
}

exports.search = (title, genre, year) => {
    let result;

    if (title) {
        result = Movie.find({ title: title });
    }

    if (genre) {
        result = Movie.find({ genre: genre });
    }

    if (year) {
        result = Movie.find({ year: year });
    }

    return result;
}
