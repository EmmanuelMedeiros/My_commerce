const ProductBusiness = require('../business/ProductBusiness')
const EndMsg = require('../models/EndMsg')

module.exports = class ProductController {
    
    static async CreateProduct(req, res) {
    
        let productStatus = new EndMsg("", "")
        const {title, description, value} = req.body
        const product = {
            title,
            description,
            value
        }

        

    }

}