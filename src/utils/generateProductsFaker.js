const {faker} = require("@faker-js/faker")

exports.generateProducts = ()=>{
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        code: faker.string.numeric(),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.department(),
        thumbnail: [faker.image.url()]
    }
}