const mongoose = require('../db/coon')
const User = require('./User')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        owner: {
            type: Object,
            required: true
        }
    })
)

module.exports = Product