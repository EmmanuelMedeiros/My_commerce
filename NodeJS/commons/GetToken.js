const EndMsg = require('../models/EndMsg')

function GetToken(req) {

    let token 

    if(!req.headers.authorization) {
        return null
    }

    token = req.headers.authorization.split(" ")[1]

    return token
}

module.exports = GetToken