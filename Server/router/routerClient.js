const router = require("express").Router();
const ControllerClient = require("../controllers/controllerClient");


router.post("/registerClient", ControllerClient.registerClient);
router.get("/bourdingHouses", ControllerClient.bourdingHouses);
router.get("/bourdingHouses/:id", ControllerClient.bourdingHousesId);

module.exports = router;
