"use strict";

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
  sequelize,
  Sequelize,
} = require("../models");

class ControllerAdmin {
  static async getAllData(req, res, next) {
    try {
      let adminKos = await BoardingHouses.findAll({
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          {
            model: Users,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(adminKos);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBordinghouses(req, res, next) {
    try {
      const { id } = req.params;

      const cekBoardingHouse = await BoardingHouses.findByPk(id);

      if (!cekBoardingHouse) {
        throw { name: "NotFound" };
      }

      await BoardingHouses.destroy({
        where: { id },
      });

      res.status(200).json({
        message: "Delete succsesfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerAdmin;
