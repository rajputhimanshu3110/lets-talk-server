const mongoose = require('mongoose');
const { Schema } = mongoose;

const Socket = new Schema({
    mobile: {
        type: String,
        ref: 'User'
    },
    sockets: {
        type: [String],
    },
});

module.exports = mongoose.model('socket', Socket);