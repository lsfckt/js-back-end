const Cast = require('../models/Cast');

exports.createCast = (castData) => {
    return Cast.create(castData);
}