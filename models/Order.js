const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    }, 
    phone_number: {
        type: String,
        required: true
    },
    product_id: {
        type: Number,
        required: true
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);