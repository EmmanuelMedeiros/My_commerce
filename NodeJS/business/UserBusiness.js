const EndMsg = require('../models/EndMsg')

module.exports = class UserBusiness {

    static async CheckRegister(user) {
    
        if(user.email === undefined || user.pwd === undefined) {
            return new EndMsg(400, "Need to fill the email and password fields")
        }

        if(user.email.trim().length === 0 || user.pwd.toString().trim().length === 0) {
            console.log(user.email.trim.length)
            return new EndMsg(400, "Need to fill the email and password fields")
        }

        return new EndMsg(200, "Sucess")
    }
}