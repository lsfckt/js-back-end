const mongoose = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 7,
        max: 77,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        required: true,
        maxLength: 700,
    },
    imageURL: {
        type: String,
        required: true,
        match: new RegExp(/^https?\/\//),
    },
    // cast: {
    //     type: Number,
    //     required: true,
    //     min: 1,
    //     max: 5,
    // },
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;