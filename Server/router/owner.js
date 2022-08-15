const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const OwnerController = require("../controllers/OwnerController");
const authorizationOwner = require("../middlewares/authorizationOwner");

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

router.put(
  "/boardinghouse/:id",
  authentication,
  OwnerController.updateBoardingHouse
);

router.delete(
  "/boardinghouse/:id",
  authentication,
  authorizationOwner,
  OwnerController.deleteBoardingHouse
);

module.exports = router;
