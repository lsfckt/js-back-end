const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Title should be at least 5 characters long'],
        match: /^[A-Za-z0-9\s]+$/,
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        match: /^[A-Za-z0-9\s]+$/,
    },
    director: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[A-Za-z0-9\s]+$/,
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
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;