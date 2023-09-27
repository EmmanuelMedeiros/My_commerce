const jwt = require('jsonwebtoken')
const EndMsg = require('../models/EndMsg')

async function CreateUserToken(user) {

    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, "commerce")

    return {
        msg: "Authenticated",
        token: token,
        userId: user._id,
        status: 200
    }
}

module.exports = CreateUserToken