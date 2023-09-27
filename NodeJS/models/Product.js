const mongoose = require('../db/coon')
const User = require('./User')
const { Schema } = mongoose

const Product = mongoose.Model(
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
            type: User,
            required: true
        }
    })
)

module.exports = Product