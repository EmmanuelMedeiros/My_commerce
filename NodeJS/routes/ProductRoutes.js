const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const VerifyToken = require('../commons/VerifyToken')

router.post('/post', VerifyToken, ProductController.CreateProduct)

module.exports = router