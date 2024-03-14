const { Schema, model, MongooseError } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, 'Invalid Email Adress!'],
        minLength: [7, 'Email should be at least 7 characters long!'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long!'],
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

userSchema.virtual('repeat-password')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Passwords missmatch!');
        }
    })

const User = model('User', userSchema);

module.exports = User;

