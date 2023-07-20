const config = require ("../config/configServer.js") 
let ProductDao
let CartDao


switch (config.persistence) {
    case 'MONGO':
        //coneccion
        config.connectDb()
        const ProductDaoMongo = require ("./mongo/product.mongo.js")
        const CartDaoMongo = require("./mongo/cart.mongo.js")
        ProductDao = ProductDaoMongo
        CartDao = CartDaoMongo
        break;
        
    case 'FILE':
        const ProductDaoFile = require ("./fileSystem/product.file.js")
        const CartDaoFile = require ("./fileSystem/carts.file.js")
        ProductDao = ProductDaoFile
        CartDao = CartDaoFile   
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    CartDao
}