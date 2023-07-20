const fs = require("fs")
const path = require("path")
const { logger } = require("../../utils/logger")
const filepath = path.join(__dirname, "../fileSystem/carts.json")

class CartDaoFile {
  constructor() {
    this.carts = []
    this.path = filepath
    this.lastId = 1
    try {
      if (fs.existsSync(this.path)) {
      const jsonFile = fs.readFileSync(this.path, "utf-8");
      const data = JSON.parse(jsonFile)
      this.carts = data
      } else {
      fs.writeFileSync(this.path, JSON.stringify(this.carts), "utf-8")
      }    
    } catch (error) {
      logger.error(error)
    } 
  }

  async createCart(obj){
    try {
      if (this.carts.length > 0) {
        this.lastId = this.carts[this.carts.length - 1].id + 1;
      }
      const newCart = { id: this.lastId, ...obj }
      this.carts.push(newCart);
      await fs.promises.writeFile(this.path,JSON.stringify(this.carts, "utf-8", "\t"));
      return newCart
    } catch (error) {
      logger.error(error)
    }
  }

  async getCarts(){
    try {
      return this.carts;
    } catch (error) {
      logger.error(error)
    }
  }

  async getCartById(cid){
    try{
      return this.carts.find(product => product.id === parseInt(cid))
    }catch(error){
      logger.error(error)
    }
  }

  async addToCart(cid, pid, cantidad){
    try {
      const carts = await this.getCarts()
      const cart = carts.find(element => element.id === parseInt(cid))
      
        const addProduct = cart.products.find(element => element.idProduct === parseInt(pid))
        if(addProduct) {
          addProduct.cantidad += cantidad
        }else{
          cart.products.push({idProduct: parseInt(pid), cantidad: cantidad })
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, "utf-8", "\t"));
        return cart
    } catch (error) {
      logger.error(error)
    }
  }

  async emptyCart(cid){
    try {
      let cart = await this.getCartById(cid)
      return cart.products = []
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteProductFromCart(cid, pid){
    try{
      const carts = await this.getCarts()
      const cart = carts.find(element => element.id === parseInt(cid))
      const deleteProduct = cart.products.find(element => element.idProduct === parseInt(pid))

      if(!deleteProduct){
        return
      }else{
        cart.products = cart.products.filter(element => element.idProduct !== parseInt(pid));
        await fs.promises.writeFile(this.path, JSON.stringify(carts, "utf-8", "\t"));
        return cart
      }

    }catch(error){
      logger.error(error)
    }
  }

  async modifyProductFromCart(cid ,pid , cantidad){
    try {
      const carts = await this.getCarts()
      const cart = carts.find(element => element.id === parseInt(cid))
      const product = cart.products.find(element => element.idProduct === parseInt(pid))
      if(!product){
        return
      }else{
        product.cantidad = cantidad
        await fs.promises.writeFile(this.path, JSON.stringify(carts, "utf-8", "\t"));
        return cart
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async modifyCart(cid, newCart){
    try {
      const carts = await this.getCarts()
      const cart = carts.find(element => element.id === parseInt(cid))
      if(!cart){
        return
      }else{
        cart.products = newCart
        await fs.promises.writeFile(this.path, JSON.stringify(carts, "utf-8", "\t"));
        return cart
      }
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports= CartDaoFile