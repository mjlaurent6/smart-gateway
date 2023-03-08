const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const EndDevice = mongoose.model('End_Device', new Schema({
        devEui: {
            type: String,
            index: true,
            required: true,
            unique: true
        },
        appEui: {
            type: String,
            index: true,
            required: true,
            unique: true
        },
        name: String,
        owner: String,
    }, {timestamps: true})
);

module.exports = {EndDevice};
