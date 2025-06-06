const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const completoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    shippingAdress: {
        type: String,
        required: true,
    },
    customization: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
})

const Completo = mongoose.model('Completo', completoSchema);

module.exports = Completo;