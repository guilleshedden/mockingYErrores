const { ProductDto } = require("../dto/product.dto");
const { productService } = require("../services/Services");
const { Error } = require("../utils/customError/Errors");
const { CustomError } = require("../utils/customError/customError");
const { createProductErrorInfo } = require("../utils/customError/info");
const { generateProducts } = require("../utils/generateProductsFaker");
const { logger } = require("../utils/logger");


class ProductController{

    getProducts = async (req, res) =>{
        try {
            const {limit= 5}= req.query
            const{page=1} = req.query
            const { sort } = req.query;
            
            const products = await productService.getProducts(limit, page, sort)
            res.status(201).send({status: "success", payload: products})
        } catch (error) {
            logger.error(error)
        }
    }

    getProductById = async(req, res) => {
        try{
            const id = req.params.pid;
            const product = await productService.getProductById(id);
            !product
            ?res.status(404).send({ error: "No existe el producto" })
            :res.send(product); 
        } catch(error){
            logger.error(error)
        }
    }

    createProduct = async(req, res, next)=>{
        try{
            const {title, description, price, code, stock, category, thumbnail} = req.body
            if(!title || !description || !price || !code || !stock || !category){
                CustomError.createError({
                    name: "Product creation error",
                    cause: createProductErrorInfo({
                        title, 
                        description, 
                        price, 
                        code, 
                        stock, 
                        category
                    }),
                    message: "Error trying to create product",
                    code: Error.INVALID_TYPE_ERROR
                })
            }
            let newProduct = new ProductDto({title, description, price, code, stock, category, thumbnail}) 
            let product = await productService.createProduct(newProduct)
            !product
            ? res.status(400).send({ error: "No se pudo crear el producto" })
            : res.status(201).send({status: "Producto creado", payload: product})
        } catch(error){
            next(error)
        }
    }

    updateProduct = async(req, res)=>{
        try{
            const id = req.params.pid;
            const productModify= req.body
            const modifiedProduct= await productService.updateProduct(id, productModify)
            !modifiedProduct
            ? res.status(400).send({ error: "No se ha podido modificar!" })
            : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: productModify })
        }catch(error){
            logger.error(error)
        }
    }

    deleteProduct = async(req, res)=>{
        try{
            const id = req.params.pid;
            const deletedProduct = await productService.deleteProduct(id)
            !deletedProduct
            ? res.status(404).send({error: `El producto con ID ${id} no existe`})
            : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`});
        }catch(error){
            logger.error(error)
        }
    }

    generateProductsMock = async(req,res)=>{
        try {
            let products = []
            for (let i = 0; i < 50 ; i++) {
                products.push(generateProducts())  
            }
            res.send({status: "success", payload: products})
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = new ProductController()