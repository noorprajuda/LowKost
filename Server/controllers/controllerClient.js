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
  Facilities,
  Users,
} = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const { MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY } = process.env;

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

  static async boardingHouses(req, res, next) {
    try {
      let kos = await BoardingHouses.findAll({
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

      res.status(200).json(kos);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async bourdingHousesId(req, res, next) {
    try {
      const { id } = req.params;

      const idBourdingHousesId = await BoardingHouses.findByPk(id, {
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          {
            model: Users,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          { model: Images, attributes: ["imgUrl"] },
          {
            model: BoardingHouseFacilities,
            include: [{ model: Facilities, attributes: ["name"] }],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: BoardingHouseRules,
            include: [{ model: Rules, attributes: ["name"] }],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // const facility = await BoardingHouseFacilities.findAll({
      //   where: { BoardingHouseId: id },
      //   include: { model: Facilities, attributes: ["name"] },
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // });

      // const rull = await BoardingHouseRules.findAll({
      //   where: { BoardingHouseId: id },
      //   include: { model: Rules, attributes: ["name"] },
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // });

      res.status(200).json(idBourdingHousesId);
    } catch (err) {
      next(err);
    }
  }

  static async myBookmark(req, res, next) {
    try {
      const { id } = req.user;
      const myBookmark = await Bookmarks.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: BoardingHouses,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json(myBookmark);
    } catch (err) {
      next(err);
    }
  }

  static async createBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;

      const findBoardingHouse = await BoardingHouses.findByPk(id);

      if (!findBoardingHouse) {
        throw { name: "NotFound" };
      }

      let input = {
        UserId: UserId,
        BoardingHouseId: id,
      };

      const makeBookmark = await Bookmarks.create(input);
      res.status(201).json({ message: "Succesfully add bookmark" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;

      const findBookmark = await Bookmarks.findByPk(id);

      if (!findBookmark) {
        throw { name: "NotFound" };
      }

      await Bookmarks.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Bookmark succesfully delete",
      });
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { price } = req.body;

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Math.floor(Math.random() * 10000000000000),
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.findUser.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      res.status(201).json({
        statusCode: 201,
        token: transactionToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerClient;
