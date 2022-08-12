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
        username,
        email,
        password,
        phoneNumber,
        role: "Tenant",
        address,
      };

      const creteTenant = await Users.create(input);

      res.status(201).json({
        statuscode: 201,
        message: "User has been created",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ControllerClient;
