const User = require('../models/User')
const EndMsg = require('../models/EndMsg')
const UserBusiness = require('../business/UserBusiness')

module.exports = class UserController {

    static async CreateUser(req, res) {

        let userStatus = new EndMsg("", "")
        const {email, pwd} = req.body
        let user = {
            email,
            pwd
        }

        userStatus = await UserBusiness.CheckRegister(user)

        switch(userStatus.status) {
            case 200:
                return res.status(200).json({message: userStatus.msg})
            default :
                return res.status(userStatus.status).json({error: userStatus.msg})
        }
    }

}