const {Router} = require("express")
const cartController = require("../controllers/cart.controller.js")
const { passportCall } = require("../config/passportCall.js")
const { authorization } = require("../config/authorizationjwtRole.js")
const router = Router()


router.post("/", cartController.createCart)

router.get("/", cartController.getCarts)

router.get("/:cid", cartController.getCartById)

router.delete("/:cid", cartController.emptyCart)

router.put("/:cid", cartController.modifyCart)

router.delete("/:cid/products/:pid", cartController.deleteProductFromCart)

router.put("/:cid/products/:pid", cartController.modifyProductFromCart)

router.post("/:cid/products/:pid", passportCall("current", {session: false}), authorization("user"), cartController.addToCart)

router.post("/:cid/purchase", passportCall("current", {session: false}), authorization("user"), cartController.generateTicket )

module.exports= router