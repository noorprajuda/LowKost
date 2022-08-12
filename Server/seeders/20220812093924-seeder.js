"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      BoardingHouses,
      Categories,
      Rules,
      Images,
      Rooms,
      Bookmarks,
      Users,
      Facilities,
    } = require("../../data/server.json");
  },

  async down(queryInterface, Sequelize) {},
};
