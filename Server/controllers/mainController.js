const { signToken, compareHash } = require("../helpers/helpers");
const { Users, Facilities, City, Rules } = require("../models");

module.exports = class mainController {
  static async loginHandler(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      if (!user) throw { name: "Unauthorized" };
      if (!compareHash(password, user.password)) throw { name: "Unauthorized" };
      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        access_token,
        role: user.role,
        fullName: user.fullName,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getFacilities(req, res, next) {
    try {
      const facilities = await Facilities.findAll();
      res.status(200).json(facilities);
    } catch (err) {
      next(err);
    }
  }

  static async getCities(req, res, next) {
    try {
      const cities = await City.findAll();
      res.status(200).json(cities);
    } catch (err) {
      next(err);
    }
  }

  static async getRules(req, res, next) {
    try {
      const rules = await Rules.findAll();
      res.status(200).json(rules);
    } catch (err) {
      next(err);
    }
  }
};
