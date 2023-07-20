const {Router} = require("express")
const productController = require("../controllers/product.controller.js")
const { passportCall } = require("../config/passportCall.js")
const { authorization } = require("../config/authorizationjwtRole.js")
const router = Router()

router.get("/mockingproducts", productController.generateProductsMock)

router.get("/", productController.getProducts);

router.post("/./config/authorizationjwtRole.js", passportCall("current", {session: false}), authorization("admin"), productController.createProduct);

router.get("/:pid", productController.getProductById);

router.post("/" ,passportCall("current", {session: false}), authorization("admin"), productController.createProduct);

router.put("/:pid",passportCall("current", {session: false}), authorization("admin"), productController.updateProduct);

router.delete("/:pid",passportCall("current", {session: false}), authorization("admin"), productController.deleteProduct);

module.exports= router;