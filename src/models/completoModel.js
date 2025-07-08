const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const completoSchema = mongoose.Schema({
    idProd:{
        type: String,
        required: true,
    },
    priceID: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
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
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const Completo = mongoose.model('Completo', completoSchema);

module.exports = Completo;