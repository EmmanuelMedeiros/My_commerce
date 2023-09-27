const EndMsg = require('../models/EndMsg')
const GetUserByToken = require('../commons/GetUserByToken')

module.exports = class ProductBusiness {

    static async CreateProduct(req, product) {

        if(!product.title || !product.description || !product.amount || !product.value) {
            return new EndMsg(422, 'This field cannot be null')
        }

        const productOwner = await this.InsertProductOwner(req, product)

        if(!productOwner) {
            return new EndMsg(400, 'User not found')
        }   

        return new EndMsg(200, productOwner)

    }

    static async InsertProductOwner(req, product) {

        const productOwner = await GetUserByToken(req)

        

        return productOwner
    }

}