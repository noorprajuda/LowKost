"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE EXTENSION postgis;");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DROP EXTENSION postgis;");
  },
};
