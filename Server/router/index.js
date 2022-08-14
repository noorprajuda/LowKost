const router = require("express").Router();
const routerClient = require("./routerClient");
const owner = require("./owner");
const mainController = require("../controllers/mainController");
const admin = require("./admin");

router.post("/login", mainController.loginHandler);
router.get("/facilities", mainController.getFacilities);
router.get("/rules", mainController.getRules);
router.get("/cities", mainController.getCities);
router.use("/owner", owner);
router.use("/user", routerClient);
router.use("/admin", admin);

module.exports = router;
