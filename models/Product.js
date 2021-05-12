const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_id: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);