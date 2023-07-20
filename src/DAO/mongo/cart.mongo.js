const { logger } = require("../../utils/logger.js")
const { CartModel } = require("./models/cart.model.js")
const { TicketModel } = require("./models/ticket.model.js")

class CartDaoMongo{
    constructor(){
        this.cartModel= CartModel
    }
    
    async getCarts(){
        try{
            return await this.cartModel.find({})
        }catch(error){
            logger.error(error)
        }
    }

    async createCart(newCart){
        try{
            return await this.cartModel.create(newCart)
        }catch(error){
            logger.error(error)
        }
    }

    async getCartById(cid){
        try{
            return await this.cartModel.findOne({_id: cid}).lean();
        }catch(error){
            logger.error(error)
        }
    }

    async addToCart(cid, pid, cantidad){
        try{
            const respUpdate= await this.cartModel.findOneAndUpdate(
                {_id: cid,"products.product": pid},
                { $inc: { "products.$.cantidad": cantidad } },
                {new:true}
            )
            if(respUpdate){
                return respUpdate
            }

            return await this.cartModel.findOneAndUpdate(
                {_id: cid},
                { $push: { products: { product: pid, cantidad} } },
                {new:true, upsert:true}
            )
        }catch(error){
            logger.error(error)
        }
    }

    async deleteProductFromCart(cid, pid){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id:cid},
                {$pull: {products:{product:pid}}},
                {new:true}
            )
        }catch(error){
            logger.error(error)
        }
    }

    async emptyCart(cid){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id:cid},
                {$set: {products:[]}},
                {new:true}
            )
        }catch(error){
            logger.error(error)
        }
    }

    async modifyProductFromCart(cid, pid, cantidad){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id: cid,"products.product": pid},
                { $set: { "products.$.cantidad": cantidad } },
                {new:true}
            )
        }catch(error){
            logger.error(error)
        }
    }

    async modifyCart(cid, newCart){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id:cid},
                {$set: {products: newCart}},
                {new:true}
            )
        }catch(error){
            logger.error(error)
        }
    }

    async generateTicket(ticketData){
        try {
            return await TicketModel.create(ticketData);
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CartDaoMongo;