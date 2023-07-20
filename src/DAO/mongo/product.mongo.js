const { logger } = require("../../utils/logger.js")
const { ProductModel } = require("./models/product.model.js")

class ProductDaoMongo{
    constructor(){
        this.productModel = ProductModel
    }
    
    async getRealTimeProducts(){
        try{
            return await this.productModel.find({}).lean()
        }catch(err){
            return new Error(err)
        }
    }
    
    async getProducts(limit ,page ,sort){
        try{
            let sortOptions
    
            if (sort === "asc") {
                sortOptions = { price: 1 }
            } else if (sort === "desc") {
                sortOptions = { price: -1 }
            }
                const options = {
                    limit: parseInt(limit),
                    page: parseInt(page),
                    sort: sortOptions,
                    leanWithId: false,
                    lean: true
                }
            
                const result = await this.productModel.paginate({}, options)
            
                const {
                    docs,
                    totalPages,
                    prevPage,
                    nextPage,
                    hasPrevPage,
                    hasNextPage
                } = result
            
                let prevLink, nextLink
            
                if (hasPrevPage) {
                  prevLink = `/api/products?page=${prevPage}&limit=${limit}&sort=${sort}`
                } else {
                  prevLink = null
                }
            
                if (hasNextPage) {
                  nextLink = `/api/products?page=${nextPage}&limit=${limit}&sort=${sort}`
                } else {
                  nextLink = null
                }
            
                return {
                    docs,
                    totalPages,
                    prevPage,
                    nextPage,
                    hasPrevPage,
                    hasNextPage,
                    prevLink,
                    nextLink
                }
        }catch(error){
            logger.error(error)
        }
    }

    async createProduct(newProduct){
        try{
            return await this.productModel.create(newProduct)
        }catch(error){
            logger.error(error)
        }
    }

    async getProductById(pid){
        try{
            return await this.productModel.findOne({_id: pid})
        }catch(error){
            logger.error(error)
        }
    }

    async deleteProduct(pid){
        try{
            return await this.productModel.deleteOne({_id: pid})
        }catch(error){
            logger.error(error)
        }
    }

    async updateProduct(pid, obj){
        try{
            return await this.productModel.updateOne({_id: pid}, obj)
        }catch(error){
            logger.error(error)
        }
    }
}

module.exports = ProductDaoMongo;