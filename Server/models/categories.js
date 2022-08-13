"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.BoardingHouses, {
        foreignKey: "CategoryId",
        onDelete: "Cascade",
      });
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
