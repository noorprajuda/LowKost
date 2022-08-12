'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardingHouseRules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoardingHouseRules.init({
    RuleId: DataTypes.INTEGER,
    BoardingHouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BoardingHouseRules',
  });
  return BoardingHouseRules;
};