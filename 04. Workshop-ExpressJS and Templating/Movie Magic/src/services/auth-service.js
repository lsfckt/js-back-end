const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const { SECRET } = require('../config/config');

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    // get user from db
    const user = await User.findOne({ email });
    // chek if user exist
    if (!user) {
        throw new Error('User or password doesn\'t exist!');
    }

    // chek if password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('User or password doesn\'t exist!');
    }

    // generate jwt token

    const token = await jwt.sign({ _id: user._id, email: user.email }, SECRET, { expiresIn: '2h' });

    return token;
};