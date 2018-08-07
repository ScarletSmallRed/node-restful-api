
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
