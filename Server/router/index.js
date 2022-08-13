const router = require("express").Router();
const routerClient = require("./routerClient");
const owner = require("./owner");
const mainController = require("../controllers/mainController");

router.post("/login", mainController.loginHandler);
router.use("/owner", owner);
router.use("/user", routerClient);

module.exports = router;
