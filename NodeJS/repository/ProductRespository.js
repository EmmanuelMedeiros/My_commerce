const Product = require('../models/Product')
const EndMsg = require('../models/EndMsg')

module.exports = class ProductRepository {
    static async CreateProduct(product) {
        const newProduct = product

        try {
            await Product.insertMany(newProduct)
            newProduct.save()
            return new EndMsg(200, newProduct)
        }catch(err) {
            return new EndMsg(500, err)
        }
    }
}