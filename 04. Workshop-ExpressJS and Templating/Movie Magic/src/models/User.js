const { Schema, mongoose } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(v);
            }
        },
        message: props => `${props.value} is not valid password, it must have minimum four characters, at least one letter and one number`,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

