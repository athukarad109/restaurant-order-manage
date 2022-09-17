const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    order: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String, //order placed, preparing, served
        required: true,
        default: 'order placed'
    },
    table: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', Order);