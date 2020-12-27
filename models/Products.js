const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    sku: {
        type: String,
        unique: true,
    },
    name:
    {
        type: String,
        trim: true,
    },
    description:
    {
        type: String,
        trim: true,
    },
    price:
    {
        type: Number,
    },
    stock:
    {
        type: Number,
    },
    available:
    {
        type: Boolean,
    },
    image:{
        type: String,
    }
});

module.exports = mongoose.model('Products', productsSchema);