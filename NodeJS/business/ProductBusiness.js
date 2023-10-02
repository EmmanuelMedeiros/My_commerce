const EndMsg = require('../models/EndMsg')
const GetUserByToken = require('../commons/GetUserByToken')
const Product = require('../models/Product')
const ProductRepository = require('../repository/ProductRespository')

module.exports = class ProductBusiness {

    static async CreateProduct(req, product) {
        
        let productStatus 

        if(!product.title.trim() || !product.description.trim()|| !product.amount || !product.value) {
            return new EndMsg(422, 'This field cannot be null')
        }

        try {
        
            const newProduct = await this.InsertProductOwner(req, product)

            if(newProduct.status != 200) {
                return new EndMsg(400, newProduct.msg)
            }   

            productStatus = await ProductRepository.CreateProduct(newProduct.msg)

            return productStatus

        }catch(err) {
            console.log(err)
            return new EndMsg(500, err)
        }
    }

    static async InsertProductOwner(req, product) {

        const productOwner = await GetUserByToken(req)
        
        if(!productOwner) {
            return new EndMsg(400, 'It was not possible to link product to you! Try again later')
        }

        if(productOwner.seller == false) {
            return new EndMsg(400, "This user is not a seller! Permission denied" )
        }

        const newProduct = new Product({
            title: product.title.trim(),
            description: product.description.trim(),
            value: product.value,
            amount: product.amount,
            owner: productOwner
        })

        return new EndMsg(200, newProduct)
    }

}