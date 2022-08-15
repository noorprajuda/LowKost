const router = require("express").Router();
const ControllerAdmin = require("../controllers/adminController");
const authentication = require("../middlewares/authentication");

router.get("/boardinghouses", authentication, ControllerAdmin.getAllData);
router.delete(
  "/boardinghouses/:id",
  authentication,
  ControllerAdmin.deleteBordinghouses
);

module.exports = router;
