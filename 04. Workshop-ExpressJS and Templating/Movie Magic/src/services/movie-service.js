const movies = [];

exports.create = (movieData) => {

    if (movies.length === 0) {
        movieData._id = 1;
    } else {
        movieData._id = movies[movies.length - 1]._id + 1;
    }

    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}

exports.getOne = (movieId) => {
    const movie = movies.find(movie => movie._id == movieId);

    return movie;
}

