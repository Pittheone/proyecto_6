const mongoose = require('mongoose');


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
        type: Number,
        required: true,
    },
    shippingAdress: {
        type: String,
        required: false,
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
        required: false,
        default: null
    }
}, {
    timestamps: true,
})

const Completo = mongoose.model('Completo', completoSchema);

module.exports = Completo;