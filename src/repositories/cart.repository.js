class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    getCarts(){
        return this.dao.getCarts()
    }
    getCartById(cid){
        return this.dao.getCartById(cid)
    }
    createCart(newCart){
        return this.dao.createCart(newCart)
    }
    addToCart(cid, pid, cantidad){
        return this.dao.addToCart(cid, pid, cantidad)
    }
    emptyCart(cid){
        return this.dao.emptyCart(cid)
    }
    deleteProductFromCart(cid, pid){
        return this.dao.deleteProductFromCart(cid, pid)
    }
    modifyProductFromCart(cid ,pid , cantidad){
        return this.dao.modifyProductFromCart(cid ,pid , cantidad)
    }
    modifyCart(cid, newCart){
        return this.dao.modifyCart(cid, newCart)
    }

    generateTicket(ticketData){
        return this.dao.generateTicket(ticketData)
    }
}

module.exports = CartRepository
