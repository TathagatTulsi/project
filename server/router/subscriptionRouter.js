const router = require("express").Router()
const subscriptionRouter = require("../controller/subscriptionController")
// const verifyToken = require("../middleware/verifyToken")

router.post("/addSuscriber", subscriptionRouter.addSuscriber)
router.get("/getSuscriber", subscriptionRouter.getSuscriber)
router.delete("/deleteSuscriber", subscriptionRouter.deleteSuscriber)
router.patch("/updateSuscriber", subscriptionRouter.updateSuscriber)
router.post("/searchSuscriber", subscriptionRouter.searchSuscriber)


module.exports = router