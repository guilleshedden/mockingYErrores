const { Schema, model }= require("mongoose")

const collection = "usuarios"

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user" //enum: ['user', 'admin']
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    password:{
        type: String,
        required: true
    }
})

const UserModel= model(collection, userSchema)

module.exports = { UserModel }