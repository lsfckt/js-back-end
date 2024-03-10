const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 4,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(v);
            },
            message: props => `${props.value} is not valid password, it must have minimum four characters, at least one letter and one number`,
        },
    },
});

userSchema.pre('save', async function (next) {

    const hash = await bcrypt.hash(this.password, 7);
    this.password = hash;
});

const User = model('User', userSchema);

module.exports = User;

