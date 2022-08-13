const {
  Users,
  BoardingHouses,
  Categories,
  Images,
  Facilities,
  BoardingHouseFacilities,
  City,
  Rules,
  BoardingHouseRules,
} = require("../models");

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
      res.status(201).json({
        message: `new user with email ${newUser.email} has been successfully registered`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBoardingHouses(req, res, next) {
    try {
      const boardinghouses = await BoardingHouses.findAll({
        include: [{ model: Categories }, { model: City }],
      });
      res.status(200).json(boardinghouses);
    } catch (err) {
      next(err);
    }
  }

  static async getBoardingHousesById(req, res, next) {
    try {
      const boardinghouses = await BoardingHouses.findByPk(req.params.id, {
        include: [{ model: Categories }, { model: City }],
      });
      const images = await Images.findAll({
        where: { BoardingHouseId: boardinghouses.id },
      });
      const facilites = await BoardingHouseFacilities.findAll({
        where: { BoardingHouseId: boardinghouses.id },
        include: [{ model: Facilities }],
      });
      const rules = await BoardingHouseRules.findAll({
        where: { BoardingHouseId: boardinghouses.id },
        include: [{ model: Rules }],
      });
      res.status(200).json({ boardinghouses, rules, images, facilites });
    } catch (err) {
      next(err);
    }
  }
};
