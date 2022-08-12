'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardingHouseFacilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoardingHouseFacilities.init({
    FacilityId: DataTypes.INTEGER,
    BoardingHouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BoardingHouseFacilities',
  });
  return BoardingHouseFacilities;
};