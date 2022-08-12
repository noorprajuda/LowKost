const router = require("express").Router();
const routerClient = require("./routerClient");

router.use("/user", routerClient);

module.exports = router;
