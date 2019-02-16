const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model("product", productSchema);

module.exports = {Product}