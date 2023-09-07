const router = require("express").Router()
const admin = require("../controller/adminController")

router.post("/admin-register", admin.registerAdmin)
router.post("/admin-login", admin.loginAdmin)

module.exports = router