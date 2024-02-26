const movies = [];

exports.create = (movieData) => {
    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}

