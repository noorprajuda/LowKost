const { BoardingHouses, Users } = require("../models");

const authrozationOwner = async (req, res, next) => {
  try {
    const { id: ownerId, role } = req.user;
    const { id: boudinghousesId } = req.params;

    if (!+boudinghousesId) {
      throw { name: "NotFound" };
    }

    const boardinghouse = await BoardingHouses.findByPk(boudinghousesId);

    if (!boardinghouse) {
      throw { name: "NotFound" };
    }
    if (role !== "Owner" && boardinghouse.UserId !== ownerId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authrozationOwner;
