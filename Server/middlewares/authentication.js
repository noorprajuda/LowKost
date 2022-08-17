const { verifyToken } = require("../helpers/helpers");
const { Users } = require("../models/");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token, "access_token authentication");
    const decode = verifyToken(access_token);

    const user = await Users.findOne({ where: { email: decode.email } });
    // if (!user) {
    //   throw { name: "Unauthorized" };
    // }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
