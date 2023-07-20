const { UserModel } = require("./models/user.model");

class UserManagerMongo{
    constructor(){
        this.userModel= UserModel
    }

    async getUser(email){
        try{
            return await this.userModel.findOne(email)
        }catch(err){
            return new Error(err)
        }
    }   
    
    async createUser(newUser){
        try{
            return await this.userModel.create(newUser)
        }catch(err){
            return new Error(err)
        }
    }
}

module.exports= UserManagerMongo