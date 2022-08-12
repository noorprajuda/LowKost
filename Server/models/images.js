"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      // define association here
      Images.belongsTo(models.BoardingHouses);
    }
  }
  Images.init(
    {
      imgUrl: DataTypes.STRING,
      BoardingHouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};
