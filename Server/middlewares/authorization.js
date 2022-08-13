const { Product } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(+id);

    if (!product) throw { name: "NotFound" };

    if (req.user.role !== "Admin") {
      if (product.UserId !== req.user.id) throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authorizationUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(+id);

    if (!product) throw { name: "NotFound" };
    if (req.user.role !== "Admin") throw { name: "Forbidden" };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization, authorizationUpdate };
