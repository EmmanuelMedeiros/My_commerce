const EndMsg = require('../models/EndMsg')
const User = require('../models/User')
const UserRepository = require('../repository/UserRepository')
const bcrypt = require('bcrypt')

module.exports = class UserBusiness {

    static async UserRegister(user) {
        
        let credentialsVerify = new EndMsg
        let userStatus 
        let encryptedPwd
        const encrypt = await bcrypt.genSalt(10)

        credentialsVerify = await this.EmailAndPwdVerify(user)

        if (credentialsVerify.status == 400) {
            return credentialsVerify
        }

        encryptedPwd = await bcrypt.hash(user.pwd, encrypt)
        
        const newUser = new User({
            email: user.email,
            password: encryptedPwd
        })

        userStatus = await UserRepository.CreateUser(newUser)

        return userStatus
    }

    static async UserLogin(user) {

        let credentialsVerify = new EndMsg
        let userStatus = new EndMsg

        credentialsVerify = await this.EmailAndPwdVerify(user)

        if (credentialsVerify.status == 400) {
            return credentialsVerify
        }

        userStatus = await UserRepository.GetUser(user)

        return userStatus
        
    }

    static async EmailAndPwdVerify(user) {
        
        if(user.email === undefined || user.pwd === undefined) {
            return new EndMsg(400, "Need to fill the email and password fields")
        }

        if(user.email.trim().length === 0 || user.pwd.trim().length === 0) {
            return new EndMsg(400, "Need to fill the email and password fields")
        }  

        return new EndMsg(200, "Sucess")
    }
}