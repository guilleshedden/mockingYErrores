const { ChatModel } = require("./models/chat.model.js")

class ChatManagerMongo{
    constructor(){
        this.chatModel = ChatModel
    }
    async saveMessages(data){
        try{
            return await this.chatModel.create(data)
        }catch(err){
            throw new Error(err);
        }
    }

    async getMessages(){
        try{
            return await this.chatModel.find({})
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = ChatManagerMongo;