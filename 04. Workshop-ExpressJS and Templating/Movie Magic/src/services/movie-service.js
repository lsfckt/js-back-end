const movies = [];

exports.create = (movieData) => {

    movieData._id = movies[movies.length - 1]._id + 1;
    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}

