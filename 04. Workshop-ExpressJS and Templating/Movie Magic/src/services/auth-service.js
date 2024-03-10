const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const SECRET = '2039jd02ied0p2dm9k029oed';

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

    const signAsync = util.promisify(jwt.sign);

    const token = await signAsync({
        _id: user._id,
        email: user.email,
    },
        SECRET,
        { expiresIn: '2h' });

    return token;
};