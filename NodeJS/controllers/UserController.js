const User = require('../models/User')
const EndMsg = require('../models/EndMsg')
const UserBusiness = require('../business/UserBusiness')
const GetToken = require('../commons/GetToken')

module.exports = class UserController {

    static async CreateUser(req, res) {

        let userStatus = new EndMsg("", "")
        const {email, pwd, seller} = req.body
        let user = {email , pwd, seller}

        userStatus = await UserBusiness.UserRegister(user)

        switch(userStatus.status) {
            case 200:
                return res.status(200).json({message: userStatus.msg})
            default :
                return res.status(userStatus.status).json({error: userStatus.msg})
        }
    }

    static async UserLogin(req, res) {

        let userStatus = new EndMsg("", "")
        const {email, pwd} = req.body
        let user = {email , pwd}

        userStatus = await UserBusiness.UserLogin(user)

        switch(userStatus.status) {
            case 200:
                return res.status(200).json({message: userStatus.msg})
            default:
                return res.status(userStatus.status).json({error: userStatus.msg})
        }
    }

    static async GetUserByid(req, res) {

        const id = req.params.id
        let userStatus = new EndMsg("", "")

        userStatus = await UserBusiness.GetUserById(id)

        switch(userStatus.status) {
            case 200:
                return res.status(200).json({message: userStatus.msg})
            default:
                return res.status(userStatus.status).json({error: userStatus.msg})
        }

    }

}