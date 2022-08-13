const { signToken, compareHash } = require("../helpers/helpers");
const { Users } = require("../models");

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
      next(err);
    }
  }
};
