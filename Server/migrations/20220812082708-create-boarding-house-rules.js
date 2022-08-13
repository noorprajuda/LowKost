"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoardingHouseRules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RuleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rules",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      BoardingHouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "BoardingHouses",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BoardingHouseRules");
  },
};
