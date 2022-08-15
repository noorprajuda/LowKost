const request = require("supertest");
const { Users } = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const app = require("../app");

let access_token = "";
const userTest1 = {
  fullName: "User 1",
  email: "user1@mail.com",
  password: "12345678",
  phoneNumber: "086363628781",
  role: "Tenant",
  address: "Jalan Kenangan 1 no 12",
};

beforeAll(async () => {
  try {
  } catch (err) {}
});
