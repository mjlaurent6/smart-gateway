const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const Gateway = mongoose.model('Gateway', new Schema({
        eui: {
            type: String,
            index: true,
            required: true,
            unique: true
        },
        name: String,
        owner: String,
    }, {timestamps: true})
);

module.exports = {Gateway};
