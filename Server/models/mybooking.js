"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyBooking extends Model {
    static associate(models) {
      MyBooking.belongsTo(models.BoardingHouses);
      MyBooking.belongsTo(models.Users);
    }
  }
  MyBooking.init(
    {
      BoardingHouseId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "MyBooking",
      hooks: {
        beforeCreate(instance) {
          instance.status = "Unpaid";
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return MyBooking;
};
