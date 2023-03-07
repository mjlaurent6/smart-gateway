const mongoose = require('mongoose');

const Gateway = mongoose.model('Gateway', {
    gatewayEUI: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    gatewayName: String,
    owner: String,
});

module.exports = {Gateway};
