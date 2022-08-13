const router = require("express").Router();
const ControllerClient = require("../controllers/controllerClient");

router.get("/register", ControllerClient.registerClient);

module.exports = router;
