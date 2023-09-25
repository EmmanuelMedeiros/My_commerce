const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.CreateUser)
router.post('/login', UserController.UserLogin)
router.get('/getbyid/:id', UserController.GetUserByid)

module.exports = router