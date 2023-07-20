class ProductDto{
    constructor(product){
        this.title= product.title
        this.description= product.description
        this.price= product.price
        this.code= product.code
        this.stock= product.stock
        this.category= product.category
        this.thumbnail= product.thumbnail
    }
}

module.exports ={
    ProductDto
}