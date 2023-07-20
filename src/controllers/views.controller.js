const { productService, cartService } = require("../services/Services")
const { logger } = require("../utils/logger")


class ViewsController{

    getProducts = async(req,res)=>{
        try{
            const {limit= 10}= req.query
            const{page=1} = req.query
            const { sort } = req.query
            let sortOptions={}
            let user = req.session.user

            if (sort === "asc") {
                sortOptions = { price: 1 };
            } else if (sort === "desc") {
                sortOptions = { price: -1 };
            }
            
            let { 
                docs, 
                totalPages,
                prevPage, 
                nextPage,
                hasPrevPage, 
                hasNextPage,
                prevLink,
                nextLink 
            } = await productService.getProducts(limit ,page ,sortOptions)
    
            !hasPrevPage
            ? prevLink = null
            : prevLink =`/?page=${prevPage}&limit=${limit}&sort=${sort}`
    
            !hasNextPage 
            ?nextLink = null
            :nextLink =`/?page=${nextPage}&limit=${limit}&sort=${sort}`
    
    
            res.render("home",{
                title: "Lista de Productos",
                payload: docs,
                user,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            })
    
        }catch(error){
            logger.error(error)
        }
    }

    getRealTimeProducts = async(req, res)=>{
        try{
            let user = req.session.user
            const carts = await productService.getRealTimeProducts()

            res.render("realTimeProducts", {
                title: "Lista de productos en tiempo real",
                products: carts,
                user
            })
        }catch(error){
            logger.error(error)
        }
    }

    getCartById = async(req,res)=>{
        try{
            const cid = req.params.cid;
            const cart = await cartService.getCartById(cid);
            if(!cart){
                res.status(404).send({ message: `El carrito con ID ${cid} no existe` })
            }else{
                let products= cart.products
                res.status(201).render("cart", {
                    products
                })
            }
        } catch(error){
            logger.error(error)
        }
    
    }
}

module.exports = new ViewsController()