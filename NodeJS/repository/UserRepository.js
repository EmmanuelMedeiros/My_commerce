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
}