const { BoardingHouses, Users } = require("../models");

const authrozationAdmin = async (req, res, next) => {
  try {
    const { id: adminid, role } = req.user;
    const { id: bourdingHousesId } = req.params;

    if (!+bourdingHousesId) {
      throw { name: "NotFound" };
    }

    const boundringHouses = await BoardingHouses.findByPk(bourdingHousesId);

    if (!boundringHouses) {
      throw { name: "NotFound" };
    }
    if (role !== "Admin") {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authrozationAdmin;
