const express = require("express");
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
const { Server }= require("socket.io")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");
const routerServer= require("./routes/index.js")
const { initPassportGithub } = require("./config/passportConfig.js");
const { initPassport } = require("./config/passport-jwt-config.js");
const { productService, chatService } = require("./services/Services.js");
const configServer = require("./config/configServer.js");
const { errorHandler } = require("./middlewares/error.middleware.js");
const { logger, addLogger } = require("./utils/logger.js");
const ObjectId = mongoose.Types.ObjectId
const PORT = process.env.PORT;
const app = express()

const httpServer = app.listen(PORT, () => {
	logger.info(`Escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer)

//hbs
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine", "handlebars")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname+"/public"))

app.use(cookieParser(configServer.jwt_secret_key))

app.use(session({
	store: MongoStore.create({
		ttl: 100000*60,
		mongoUrl: process.env.MONGO_URL,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}

	}),
	secret: configServer.jwt_secret_key,
	resave: false,
	saveUninitialized: false
}))

//Passport
initPassport()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())

app.use(addLogger)
app.use(routerServer)
app.use(errorHandler)

//realtimeproducts
socketServer.on("connection", socket=>{
	logger.info("cliente conectado")
	
	socket.on("deleteProduct", async (pid)=>{
		try{
			const isValidObjectId = ObjectId.isValid(pid.id)
			if (!isValidObjectId) {
			  return socket.emit("newList", {status: "error", message: `El ID del producto es inválido`})
			}
		  
			const product = await productService.getProductById(pid.id)
			if(product) {
			  await productService.deleteProduct(pid.id)
			  const data = await productService.getRealTimeProducts()
			  return socket.emit("newList", data)
			}
			return socket.emit("newList", {status: "error", message: `El producto con ID ${pid.id} no existe`})
		}catch(error){
			logger.error(error)
		}
	})

	socket.on("addProduct", async (data) => {
		try {
			const newProduct = await productService.createProduct(data);
			if(!newProduct){
				return new Error(err)
			}else{
				const newData = await productService.getRealTimeProducts()
				return socket.emit("productAdded", newData)
			}
		} catch (error) {
			return socket.emit("productAdded", { status: "error", message: `El code: ${data.code} ya existe!`})
		}
    })

})
 

//chat
socketServer.on("connection", socket => {

    socket.on("message", async(data) => {
		try{
			await chatService.saveMessages(data)
			const messages = await chatService.getMessages()
			socketServer.emit("messageLogs", messages)
		}catch(error){
			logger.error(error)
		}
    })

    socket.on("authenticated", data => {
        socket.broadcast.emit("newUserConnected", data)
    })
})