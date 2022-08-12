"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyBooking extends Model {
    static associate(models) {
      MyBooking.hasMany(models.BoardingHouses);
      MyBooking.hasOne(models.Users);
    }
  }
  MyBooking.init(
    {
      BoardingHouseId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "MyBooking",
    }
  );
  return MyBooking;
};
