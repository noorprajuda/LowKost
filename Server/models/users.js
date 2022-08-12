"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helpers");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.BoardingHouses);
      Users.hasMany(models.Bookmarks);
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
          notNull: { msg: `Email cannot be Null` },
          notEmpty: { msg: `Email cannot be Empty` },
          isEmail: { msg: `Must be a valid email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Password cannot be Null` },
          notEmpty: { msg: `Password cannot be Empty` },
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

  Users.beforeCreate((user, options) => {
    const bcrypt = hashPassword(user.password);
    user.password = bcrypt;
  });
  return Users;
};
