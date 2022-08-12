"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingHouseRules extends Model {
    static associate(models) {
      BoardingHouseRules.hasOne(models.Rule);
      BoardingHouseRules.hasMany(models.BoardingHouses);
    }
  }
  BoardingHouseRules.init(
    {
      RuleId: DataTypes.INTEGER,
      BoardingHouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BoardingHouseRules",
    }
  );
  return BoardingHouseRules;
};
