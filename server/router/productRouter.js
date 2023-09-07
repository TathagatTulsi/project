const router = require("express").Router()
const productRoute = require("../controller/productController")
// const verifyToken = require("../middleware/verifyToken")

router.post("/addProduct", productRoute.addProduct)
router.get("/getProduct", productRoute.getProduct) 
router.delete("/deleteProduct", productRoute.deleteProduct)
router.patch("/updateProduct", productRoute.updateProduct)

router.get("/searchProduct", productRoute.searchProduct) // Not Working


module.exports = router