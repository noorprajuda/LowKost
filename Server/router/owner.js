const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const OwnerController = require("../controllers/OwnerController");
const authorizationOwner = require("../middlewares/authorizationOwner");
const multer = require("multer");

const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

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

router.post("/upload", upload.single("photo"), OwnerController.uploadImage);

module.exports = router;
