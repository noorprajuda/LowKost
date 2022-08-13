"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoardingHouses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      CityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Cities",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      totalRoom: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      description: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.GEOMETRY("POINT"),
      },
      slug: {
        type: Sequelize.STRING,
      },
      mainImg: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("BoardingHouses");
  },
};
