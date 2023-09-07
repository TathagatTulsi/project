const router = require("express").Router()
const OrganizationRoute = require("../controller/organizationController")
// const verifyToken = require("../middleware/verifyToken")

router.post("/registerOrganization", OrganizationRoute.registerOrganization)
router.get("/getOrganization", OrganizationRoute.getOrganization) 
router.delete("/deleteOrganization", OrganizationRoute.deleteOrganization)
router.patch("/updateOrganization", OrganizationRoute.updateOrganization)
router.post("/loginOrganization", OrganizationRoute.loginOrganization)
router.post("/changePassOrganization", OrganizationRoute.changePassOrganization) 
router.post("/forgetPassOrganization", OrganizationRoute.forgetPassOrganization) // Not Working

router.get("/searchOrganization", OrganizationRoute.searchOrganization)
router.patch("/organizationStatus", OrganizationRoute.OrganizationStatus)


module.exports = router