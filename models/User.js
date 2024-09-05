const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
    },
    about: {
        type: String,
    },
    profile: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    role: {
        type: Number,
    },
});

module.exports = mongoose.model('user', User);