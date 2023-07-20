const { Schema, model }= require("mongoose")

const collection= "messages"

const chatSchema = new Schema({
    user:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require:true
    }
})

const ChatModel = model(collection, chatSchema)

module.exports = { ChatModel }