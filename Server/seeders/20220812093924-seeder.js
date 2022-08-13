"use strict";

const { hashPassword } = require("../helpers/helpers");
module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      BoardingHouses,
      Categories,
      Rules,
      Images,
      Users,
      Facilities,
      BoardingHouseFacilities,
      BoardingHouseRules,
      City,
    } = require("../../data/server.json");
    Categories.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date()), delete el.id;
    });

    Facilities.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    Rules.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    City.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    Users.forEach((el) => {
      (el.createdAt = new Date()),
        (el.updatedAt = new Date()),
        (el.password = hashPassword(el.password));
    });

    BoardingHouses.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
      el.slug = el.name.replace(/\s+/g, "-").toLowerCase();
      el.location = Sequelize.fn("ST_GeomFromText", `POINT(${el.location})`);
      delete el.id;
    });

    Images.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    BoardingHouseFacilities.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    BoardingHouseRules.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });

    await queryInterface.bulkInsert("Categories", Categories);
    await queryInterface.bulkInsert("Rules", Rules);
    await queryInterface.bulkInsert("Facilities", Facilities);
    await queryInterface.bulkInsert("Cities", City);
    await queryInterface.bulkInsert("Users", Users);
    await queryInterface.bulkInsert("BoardingHouses", BoardingHouses);
    await queryInterface.bulkInsert("Images", Images);
    await queryInterface.bulkInsert(
      "BoardingHouseFacilities",
      BoardingHouseFacilities
    );
    await queryInterface.bulkInsert("BoardingHouseRules", BoardingHouseRules);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null);
    await queryInterface.bulkDelete("Rules", null);
    await queryInterface.bulkDelete("Facilities", null);
    await queryInterface.bulkDelete("City", null);
    await queryInterface.bulkDelete("Users", null);
    await queryInterface.bulkDelete("BoardingHouses", null);
    await queryInterface.bulkDelete("Images", null);
    await queryInterface.bulkDelete("BoardingHouseFacilities", null);
    await queryInterface.bulkDelete("BoardingHouseRules", null);
  },
};
