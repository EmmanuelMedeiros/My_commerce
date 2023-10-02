const EndMsg = require('../models/EndMsg')
const User = require('../models/User')
const UserRepository = require('../repository/UserRepository')
const bcrypt = require('bcrypt')
const CreateUserToken = require('../commons/CreateUserToken')

module.exports = class UserBusiness {


    static async UserRegister(user) {
        
        let credentialsVerify = new EndMsg
        let userExists
        let userStatus 
        let encryptedPwd
        const encrypt = await bcrypt.genSalt(10)

        credentialsVerify = await this.EmailAndPwdVerify(user)

        if (credentialsVerify.status != 200) {
            return credentialsVerify
        }

        userExists = await this.UserExists(user.email)

        if (userExists.status != 200 ) {
            return userExists
        }

        encryptedPwd = await bcrypt.hash(user.pwd, encrypt)
        
        const newUser = new User({
            email: user.email,
            password: encryptedPwd,
            seller: user.seller
        })

        userStatus = await UserRepository.CreateUser(newUser)

        return userStatus
    }


    static async UserLogin(user) {

        let credentialsVerify = new EndMsg
        let pwdVerify   
        let myUser
        let userToken

        credentialsVerify = await this.EmailAndPwdVerify(user)

        if (credentialsVerify.status == 400) {
            return credentialsVerify
        }

        myUser = await UserRepository.GetUserByEmail(user)

        if(myUser == null) {
            return new EndMsg(400, "User not found")
        }

        pwdVerify = await bcrypt.compareSync(user.pwd, myUser.password)

        if (!pwdVerify) {
            return new EndMsg(400, "Password does not match")
        }

        userToken = await CreateUserToken(myUser)

        return new EndMsg(200, userToken)
        
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


    static async GetUserById(userId) {

        let userById

        if(userId == undefined) {
            return new EndMsg(400, 'Invalid ID')
        }
        
        userById = await UserRepository.GetUserById(userId)

        return userById
        
    }


    static async UserExists(userEmail) {

        let userExists 

        userExists = await UserRepository.UserExists(userEmail)

        if(userExists) {
            return new EndMsg(400, "User already exists")
        }

        return new EndMsg(200, userEmail)
    }
}