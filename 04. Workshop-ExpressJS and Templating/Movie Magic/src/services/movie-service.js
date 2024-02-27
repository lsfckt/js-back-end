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

exports.search = (title, genre, year) => {
    let result = movies.slice();
    
    if (title) {
        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (genre) {
        result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }

    if (year) {
        result = result.filter(movie => movie.year === year);
    }

    return result;
}
