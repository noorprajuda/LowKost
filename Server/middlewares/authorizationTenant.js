const { BoardingHouses, Users } = require("../models");

const authrozationTenant = async (req, res, next) => {
  try {
    const { id: tenantId, role } = req.user;
    const { id: boudinghousesId } = req.params;

    if (!+boudinghousesId) {
      throw { name: "NotFound" };
    }

    const boardinghouse = await BoardingHouses.findByPk(boudinghousesId);

    if (!boardinghouse) {
      throw { name: "NotFound" };
    }
    if (role !== "Owner" && boardinghouse.UserId !== tenantId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
};
