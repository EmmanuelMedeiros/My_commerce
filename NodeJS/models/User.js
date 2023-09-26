const mongoose = require('../db/coon')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        email: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true
        },
        seller: {
            type: Boolean,
            required: true
        }
    })
)

module.exports = User