const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const OwnerController = require("../controllers/OwnerController");
const authorizationOwner = require("../middlewares/authorizationOwner");
const upload = require("../middlewares/storage");

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
  // authorizationOwner,
  OwnerController.deleteBoardingHouse
);

router.get("/listTenant/:id", authentication, OwnerController.getListTenant);
router.delete(
  "/listTenant/:id/:userId",
  authentication,
  OwnerController.deleteListTenant
);

router.post("/upload", upload.single("photo"), OwnerController.uploadImage);

module.exports = router;
