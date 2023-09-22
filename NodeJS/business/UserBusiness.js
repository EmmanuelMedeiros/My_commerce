const EndMsg = require('../models/EndMsg')
const User = require('../models/User')
const UserRepository = require('../repository/UserRepository')
const bcrypt = require('bcrypt')

module.exports = class UserBusiness {

    static async CheckRegister(user) {
        
        let userStatus 
        let encryptedPwd
        const encrypt = await bcrypt.genSalt(10)

        if(user.email === undefined || user.pwd === undefined) {
            return new EndMsg(400, "Need to fill the email and password fields")
        }

        if(user.email.trim().length === 0 || user.pwd.toString().trim().length === 0) {
            return new EndMsg(400, "Need to fill the email and password fields")
        }  

        encryptedPwd = await bcrypt.hash(user.pwd.toString(), encrypt)
        
        const newUser = new User({
            email: user.email,
            password: encryptedPwd
        })

        userStatus = await UserRepository.CreateUser(newUser)

        return userStatus
    }
}