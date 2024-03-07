const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    born: {
        type: String,
        required: true,
    },
    castName: {
        type: String,
        required: true,
    },
    castImage: {
        type: String,
        required: true,
        match: /^https?/,
    },
});

const CastModel = mongoose.model('Cast', castSchema);

module.exports = CastModel;