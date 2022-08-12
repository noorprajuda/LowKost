const { Users } = require("../models");

module.exports = class OwnerController {
  static async registerHandler(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;
      const role = "Owner";
      const newUser = await Users.create({
        fullName,
        email,
        password,
        phoneNumber,
        address,
        role,
      });
      res
        .status(201)
        .json({
          message: `new user with email ${newUser.email} has been successfully registered`,
        });
    } catch (err) {
      next(err);
    }
  }
};
