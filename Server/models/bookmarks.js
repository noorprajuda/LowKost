"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    static associate(models) {
      Bookmarks.belongsTo(models.BoardingHouses);
    }
  }
  Bookmarks.init(
    {
      UserId: DataTypes.INTEGER,
      BoardingHouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bookmarks",
    }
  );
  return Bookmarks;
};
