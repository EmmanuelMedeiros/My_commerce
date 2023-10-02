const ProductBusiness = require('../business/ProductBusiness')
const EndMsg = require('../models/EndMsg')

module.exports = class ProductController {
    
    static async CreateProduct(req, res) {
    
        let productStatus = new EndMsg("", "")
        const {title, description, value, amount} = req.body
        const product = {
            title,
            description,
            value,
            amount
        }

        productStatus = await ProductBusiness.CreateProduct(req, product)

        switch(productStatus.status) {
            case 200:
                return res.status(200).json({message: productStatus.msg})
            default:
                return res.status(productStatus.status).json({error: productStatus.msg})
        }
    }

}