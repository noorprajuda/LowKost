const router = require("express").Router();
const owner = require("./owner");

router.use("/owner", owner);

module.exports = router;
