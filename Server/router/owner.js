const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register");

router.post("/login");

router.use(authentication);

module.exports = router;
