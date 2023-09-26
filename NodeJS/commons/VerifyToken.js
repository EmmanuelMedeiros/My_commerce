const GetToken = require('./GetToken')
const jwt = require('jsonwebtoken')

async function VerifyToken(req, res, next) {

    const token = await GetToken(req)
    let validToken 

    if(!token) {
        return res.status(401, 'Token needed')
    }

    try {
        validToken = jwt.verify(token, 'commerce')
        next()
    }catch(err) {
        return res.status(400).json({message: 'Invalid token'})
    }
    
}

module.exports = VerifyToken