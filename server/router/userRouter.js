const router = require("express").Router()
const userRoute = require("../controller/userController")
// const verifyToken = require("../middleware/verifyToken")

router.post("/addUser", userRoute.addUser)
router.get("/user_get", userRoute.getUser) 
router.delete("/deleteUser", userRoute.deleteUser)
router.post("/updateUser", userRoute.updateUser)
router.post("/User-Login", userRoute.loginUser)
router.post("/changePassword", userRoute.changePassword) 
router.post("/forgetPassword", userRoute.forgetPassword)
router.post("/requestOtp", userRoute.requestOtp)
router.post("/verifyOtp", userRoute.verifyOtp)

router.get("/searchUser", userRoute.searchUser)
// router.post("/forgetPassword", userRoute.forgetPassword)
router.patch("/updateStatus",userRoute.updateStatus)

module.exports = router