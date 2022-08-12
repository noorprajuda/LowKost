"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingHouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BoardingHouses.belongsTo(models.User);
      BoardingHouses.belongsTo(models.Category);
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
    },
    {
      sequelize,
      modelName: "BoardingHouses",
    }
  );
  return BoardingHouses;
};
