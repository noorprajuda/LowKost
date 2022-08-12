const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function signToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

function verifyToken(payload) {
  return jwt.verify(payload, process.env.SECRET_KEY);
}

function hashPassword(password) {
  return bcrypt.hashSync(password);
}

function compareHash(rawPass, password) {
  return bcrypt.compareSync(rawPass, password);
}

module.exports = {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
};
