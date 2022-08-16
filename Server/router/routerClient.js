const router = require("express").Router();
const ControllerClient = require("../controllers/controllerClient");
const authentication = require("../middlewares/authentication");
router.post("/register", ControllerClient.registerClient);

router.get("/boardinghouses", ControllerClient.boardingHouses);
router.post("/payment", authentication, ControllerClient.payment);

router.get("/mybookings", authentication, ControllerClient.myBookings);
router.get("/bookmark", authentication, ControllerClient.myBookmark);
router.get("/searchboardinghouses", ControllerClient.searchHandler);
router.get("/boardinghouses/:id", ControllerClient.bourdingHousesId);
router.post(
  "/mybookings/:id",
  authentication,
  ControllerClient.createMyBooking
);

router.patch(
  "/mybookings/:id",
  authentication,
  ControllerClient.changeMyBookingStatus
);
router.delete(
  "/mybookings/:id",
  authentication,
  ControllerClient.deleteMyBooking
);

router.post("/bookmark/:id", authentication, ControllerClient.createBookmark);
router.delete("/bookmark/:id", authentication, ControllerClient.deleteBookmark);

module.exports = router;
