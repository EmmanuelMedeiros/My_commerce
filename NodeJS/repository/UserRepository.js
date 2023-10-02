const User = require('../models/User')
const EndMsg = require('../models/EndMsg')

module.exports = class UserRepository {

    static async CreateUser(user) {
        const newUser = user

        try {
            await User.insertMany(newUser)
            user.save()
            return new EndMsg(200, newUser)
        }
        catch(err) {
            console.log(err)
            return new EndMsg(500, err)
        }

    }

    static async GetUserByEmail(user) {
        
        const userEmail = user.email
        let emailExists 

        console.log(userEmail)
        try {
            emailExists = await User.findOne({email: userEmail})
            return emailExists
        }catch(err){
            console.log(err)
            return new EndMsg(500, err)
        }
    }

    static async GetUserById(userId) {

        let myUser 

        try {
            myUser = await User.findById(userId).select('-password')
            if(myUser == null) {
                return new EndMsg(404, 'User not found')
            }else {
                return new EndMsg(200, myUser)
            }

        }catch(err) {
            console.log(err)
            return new EndMsg(500, err)
        }
    }

    static async UserExists(userEmail) {
        let user 

        try {
            user = await User.findOne({email: userEmail})
            return user

        }catch(err) {
            console.log(err)
            return new EndMsg(500, err)
        }
    }
}