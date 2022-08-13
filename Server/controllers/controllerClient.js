"use strict";

const {
  BoardingHouses,
  Bookmarks,
  BoardingHouseRules,
  BoardingHouseFacilities,
  Categories,
  City,
  Images,
  MyBooking,
  Rules,
  Users,
} = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");

class ControllerClient {
  static async registerClient(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;

      let input = {
        fullName,
        email,
        password,
        phoneNumber: "0" + phoneNumber,
        role: "Tenant",
        address,
      };
      console.log(input);

      const creteTenant = await Users.create(input);

      res.status(201).json({
        statuscode: 201,
        message: "User has been created",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async bourdingHouses(req, res, next) {
    try {
      let kos = await BoardingHouses.findAll({
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          {
            model: Users,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      let facilitiy = await BoardingHouseFacilities.findAll({
        include: [{ models: Facilities, attributes: ["name"] }, { kos }],
      });

      console.log(kos);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async bourdingHousesId(req, res, next) {
    try {
    } catch (err) {}
  }
}

module.exports = ControllerClient;
