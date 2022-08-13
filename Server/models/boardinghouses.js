"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingHouses extends Model {
    static associate(models) {
      BoardingHouses.belongsTo(models.Users);
      BoardingHouses.belongsTo(models.Categories);
      BoardingHouses.belongsTo(models.City);
      BoardingHouses.hasMany(models.Bookmarks);
      BoardingHouses.hasMany(models.Images);
    }
  }
  BoardingHouses.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      CityId: DataTypes.INTEGER,
      totalRoom: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      location: DataTypes.GEOMETRY,
      slug: DataTypes.STRING,
      mainImg: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BoardingHouses",
    }
  );
  BoardingHouses.beforeCreate((instance, option) => {
    instance.slug = instance.name.replace(/\s+/g, "-").toLowerCase();
  });
  return BoardingHouses;
};
