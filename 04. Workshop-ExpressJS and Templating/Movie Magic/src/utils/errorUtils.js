const mongoose = require('mongoose');

exports.getErrorMessage = (error) => {
    let message = '';

    if (error instanceof mongoose.MongooseError && error.message !== 'Passwords missmatch!') {
        message = Object.values(error.errors).at(0).message;
    } else {
        message = error.message;
    }

    return message;
}