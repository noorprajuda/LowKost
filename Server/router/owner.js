const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const OwnerController = require("../controllers/OwnerController");

router.post("/register", OwnerController.registerHandler);

router.get("/boardinghouses", OwnerController.getBoardingHouses);

module.exports = router;
