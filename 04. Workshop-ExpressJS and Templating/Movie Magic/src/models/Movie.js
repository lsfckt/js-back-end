const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1907,
        max: 2024,
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
    imageUrl: {
        type: String,
        required: true,
        match: /^https?/,
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast',
    }],
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;