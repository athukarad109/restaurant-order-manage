const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Menu', Menu);