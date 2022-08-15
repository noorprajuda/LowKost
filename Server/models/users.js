"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helpers");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.BoardingHouses);
      Users.hasMany(models.Bookmarks);
      Users.hasOne(models.MyBooking);
    }
  }
  Users.init(
    {
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: `Must be an unique Email` },
        validate: {
          notNull: { msg: `Email is required` },
          notEmpty: { msg: `Email is required` },
          isEmail: { msg: `Must be a valid email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Password is required` },
          notEmpty: { msg: `Password is required` },
          len: {
            args: [5, 255],
            msg: `Password minimum length is 5 characters`,
          },
        },
      },
      address: DataTypes.STRING,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password);
  });
  return Users;
};
