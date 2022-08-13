"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingHouseFacilities extends Model {
    static associate(models) {
      BoardingHouseFacilities.belongsTo(models.BoardingHouses);
      BoardingHouseFacilities.belongsTo(models.Facilities);
    }
  }
  BoardingHouseFacilities.init(
    {
      FacilityId: DataTypes.INTEGER,
      BoardingHouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BoardingHouseFacilities",
    }
  );
  return BoardingHouseFacilities;
};
