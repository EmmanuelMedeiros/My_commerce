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

    static async GetUser(user) {
        const myUser = user
        let userFound 

        try {
            userFound = await User.findOne({email: user.email, password: user.pwd})
            
            if(!userFound) {
                return new EndMsg(400, "User not found!")
            } else {
                return  new EndMsg(200, myUser)
            }
        }
        catch(err){ 
            console.log(err)
            return new EndMsg(500, err)
        }
    }
}