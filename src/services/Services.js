const { ProductDao, CartDao } = require("../DAO/factory");
const ProductRepository = require("../repositories/product.repository.js")
const CartRepository = require("../repositories/cart.repository.js");


const ChatManagerMongo = require("../DAO/mongo/chat.mongo");
const UserManagerMongo = require("../DAO/mongo/user.mongo");


const cartService = new CartRepository(new CartDao())
const productService = new ProductRepository(new ProductDao())
const userService = new UserManagerMongo()
const chatService = new ChatManagerMongo()

module.exports = {
    cartService,
    productService,
    userService,
    chatService
}