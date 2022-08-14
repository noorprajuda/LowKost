const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const OwnerController = require("../controllers/OwnerController");

router.post("/register", OwnerController.registerHandler);

router.get(
  "/boardinghouses",
  authentication,
  OwnerController.getBoardingHouses
);
router.get(
  "/boardinghouse/:id",
  authentication,
  OwnerController.getBoardingHousesById
);
router.post("/boardinghouse", authentication, OwnerController.addBoardingHouse);

module.exports = router;
