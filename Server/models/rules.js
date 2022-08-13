"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rules extends Model {
    static associate(models) {
      Rules.hasOne(models.BoardingHouseRules);
    }
  }
  Rules.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rules",
    }
  );
  return Rules;
};
