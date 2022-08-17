function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    case "JsonWebTokenError":
      res.status(401).json({ message: "Token invalid!" });
      break;
    case "Unauthorized":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Not Found" });
      break;
    case "SequelizeValidationError":
      let errors = [];
      err.errors.map((el) => errors.push(el.message));
      res.status(400).json({ message: errors[0] });
      break;
    case "invalidAddress":
      res.status(400).json({ message: "Please enter a valid address!" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
}

module.exports = errorHandler;
