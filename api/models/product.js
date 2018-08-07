
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    productImage: {
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
