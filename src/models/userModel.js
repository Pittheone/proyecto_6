const mongoose = require('mongoose'); 
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        adress: {
            type: String,
            default: '',
        },
        cart: {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
            default: []
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;