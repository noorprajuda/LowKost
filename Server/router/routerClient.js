const router = require("express").Router();
const ControllerClient = require("../controllers/controllerClient");
const authentication = require("../middlewares/authentication");
router.post("/register", ControllerClient.registerClient);
router.get("/boardingHouses", ControllerClient.boardingHouses);
router.post("/payment", authentication, ControllerClient.payment);
router.get("/boardingHouses/:id", ControllerClient.bourdingHousesId);

router.get("/bookmark", authentication, ControllerClient.myBookmark);
router.post("/bookmark/:id", authentication, ControllerClient.createBookmark);
router.delete("/bookmark/:id", authentication, ControllerClient.deleteBookmark);

module.exports = router;
