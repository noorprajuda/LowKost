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
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise,
});

module.exports = class OwnerController {
  static async registerHandler(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;
      const role = "Owner";
      const newUser = await Users.create({
        fullName,
        email,
        password,
        phoneNumber: `0${phoneNumber}`,
        address,
        role,
      });
      res.status(201).json({
        message: `new user with email ${newUser.email} has been successfully registered`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getBoardingHouses(req, res, next) {
    try {
      const boardinghouses = await BoardingHouses.findAll({
        include: [{ model: Categories }, { model: City }],
        // attributes: { exclude: ["location"] },
        where: { UserId: req.user.id },
      });
      res.status(200).json(boardinghouses);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getBoardingHousesById(req, res, next) {
    try {
      const boardinghouses = await BoardingHouses.findByPk(req.params.id, {
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          { model: Images, attributes: ["imgUrl"] },
          {
            model: BoardingHouseFacilities,
            include: [{ model: Facilities, attributes: ["name"] }],
          },
          {
            model: BoardingHouseRules,
            include: [{ model: Rules, attributes: ["name"] }],
          },
          { model: Users, attributes: ["fullName", "email"] },
        ],
      });
      res.status(200).json(boardinghouses);
    } catch (err) {
      next(err);
    }
  }

  static async addBoardingHouse(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        price,
        CategoryId,
        CityId,
        totalRoom,
        description,
        mainImg,
        address,
        StackRules,
        // StackImages,
        StackFacilities,
      } = req.body;

      let latlong = "";
      const response = await googleMapsClient
        .geocode({
          address: address,
        })
        .asPromise();
      let jsn = response.json.results;
      for (let i = 0; i < jsn.length; i++) {
        let res = jsn[i];
        latlong += res.geometry.location.lat + " " + res.geometry.location.lng;
      }
      console.log(latlong, "<<<<<<<<<< ");
      const newBoardingHouse = await BoardingHouses.create(
        {
          name,
          price,
          CategoryId,
          CityId,
          totalRoom,
          description,
          mainImg,
          address,
          UserId: req.user.id,
          location: Sequelize.fn("ST_GeomFromText", `POINT(${latlong})`),
        },
        { transaction: t }
      );
      const rules = StackRules.map((rule) => {
        return { BoardingHouseId: newBoardingHouse.id, RuleId: rule.id };
      });
      await BoardingHouseRules.bulkCreate(rules, { transaction: t });
      // const images = await StackImages.map((img) => {
      //   return { imgUrl: img.imgUrl, BoardingHouseId: newBoardingHouse.id };
      // });
      // await Images.bulkCreate(images, { transaction: t });
      const facilities = StackFacilities.map((el) => {
        return { FacilityId: el.id, BoardingHouseId: newBoardingHouse.id };
      });
      await BoardingHouseFacilities.bulkCreate(facilities, { transaction: t });
      await t.commit();
      res
        .status(200)
        .json({ message: `Successfull add new Kos ${newBoardingHouse.name}` });
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async updateBoardingHouse(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const {
        name,
        price,
        CategoryId,
        CityId,
        totalRoom,
        description,
        mainImg,
        address,
        StackRules,
        // StackImages,
        StackFacilities,
      } = req.body;
      console.log(req.body, "<<<<");
      console.log(StackRules);
      let latlong = "";
      const response = await googleMapsClient
        .geocode({
          address: address,
        })
        .asPromise();
      let jsn = response.json.results;
      for (let i = 0; i < jsn.length; i++) {
        let res = jsn[i];
        latlong += res.geometry.location.lat + " " + res.geometry.location.lng;
      }
      const boardinghouse = await BoardingHouses.update(
        {
          name,
          price,
          CategoryId,
          CityId,
          totalRoom,
          description,
          mainImg,
          address,
          UserId: req.user.id,
          location: Sequelize.fn("ST_GeomFromText", `POINT(${latlong})`),
        },
        { transaction: t, where: { id } }
      );
      const rules = StackRules.map((rule) => {
        return { BoardingHouseId: id, RuleId: rule.RuleId };
      });
      // await BoardingHouseRules.destroy({
      //   where: { BoardingHouseId: boardinghouse.id },
      //   transaction: t,
      // });
      await BoardingHouseRules.bulkCreate(rules, { transaction: t });
      // const images = await StackImages.map((img) => {
      //   return { imgUrl: img.imgUrl, BoardingHouseId: boardinghouse.id };
      // });
      // await Images.destroy({
      //   where: { BoardingHouseId: boardinghouse.id, transaction: t },
      // });
      // await Images.bulkCreate(images, { transaction: t });
      const facilities = StackFacilities.map((el) => {
        return { FacilityId: el.id, BoardingHouseId: el.FacilityId };
      });
      // await BoardingHouseFacilities.destroy({
      //   where: { BoardingHouseId: boardinghouse.id },
      // });
      await BoardingHouseFacilities.bulkCreate(facilities, { transaction: t });
      await t.commit();
      res
        .status(200)
        .json({ message: `Successfull update ${boardinghouse.name}` });
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async deleteBoardingHouse(req, res, next) {
    try {
      const { id } = req.params;
      const checkHouse = await BoardingHouses.findByPk(id);
      if (!checkHouse) throw { name: "NotFound" };
      await BoardingHouses.destroy({ where: { id } });
      res.status(200).json({ message: `Successfully delete data` });
    } catch (err) {
      next(err);
    }
  }
};
