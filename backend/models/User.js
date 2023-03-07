
const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: String,
    name: String,
    role: String,
});

module.exports = {User};
