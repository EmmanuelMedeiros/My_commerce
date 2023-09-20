const User = require('../models/User')
const EndMsg = require('../models/EndMsg')
const UserBusiness = require('../business/UserBusiness')

module.exports = class UserController {

    static async CreateUser(req, res) {

        let userStatus = new EndMsg("", "")

        const {email, pwd} = req.body
        const user = {
            email,
            pwd
        }

        userStatus = await UserBusiness.CheckRegister(user)
        if(userStatus.status != 200) {
            console.log("User did not filled password or email fields")
            return res.status(userStatus.status).json({error: userStatus.msg})
        }

        return res.status(200).json({message: "Usuário criado"})

    }

}