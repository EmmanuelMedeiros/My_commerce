const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/teste', UserController.CreateUser)

module.exports = router