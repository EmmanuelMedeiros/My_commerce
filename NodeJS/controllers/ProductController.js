const ProductBusiness = require('../business/ProductBusiness')

module.exports = class ProductController {
    
    static async CreateProduct(req, res) {
        return res.status(200).json({message: "Entrou"})
    }

}