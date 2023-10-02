const jwt = require('jsonwebtoken')
const GetToken = require('./GetToken')
const User = require('../models/User')

async function GetUserByToken(req) {
    
    let validToken 
    let currentUser 
    const token = GetToken(req)

    if(!token) {
        return null
    }

    try {
        validToken = jwt.verify(token, 'commerce')
        currentUser = await User.findById(validToken.id).select('-password')
    }catch(err) {
        console.log(err)
        return null
    }       

    return currentUser

}

module.exports = GetUserByToken