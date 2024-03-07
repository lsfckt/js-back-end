const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.createCast = (castData) => {
    return Cast.create(castData);
}

exports.getAll = () => {
    return Cast.find({});
}

// exports.getByIds = (castIds) => {
//     const casts = Cast.find({_id: {$in: castIds}});

//     return casts;
// };