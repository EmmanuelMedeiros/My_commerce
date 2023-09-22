const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/teste', UserController.CreateUser)
router.get('/login', UserController.UserLogin)

module.exports = router