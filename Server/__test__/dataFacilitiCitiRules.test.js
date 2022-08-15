const app = require("../app");
const request = require("supertest");
const { City, Facilities, Rules } = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const dataFacilities = require("../../data/server.json").Facilities;
const dataRules = require("../../data/server.json").Rules;
const dataCity = require("../../data/server.json").City;

let access_token = "";
beforeAll(async () => {
  try {
    await Facilities.bulkCreate(dataFacilities);
    await City.bulkCreate(dataCity);
    await Rules.bulkCreate(dataRules);
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await Facilities.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    await City.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    await Rules.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  } catch (err) {
    console.log(err);
  }
});

describe("get /rules", () => {
  test("Get all Rules", async () => {
    const response = await request(app).get("/rules");
    await expect(response.status).toBe(200);
  });

  test("Fail get all rules", async () => {
    jest.spyOn(Rules, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/rules")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("get /cities", () => {
  test("Get all cities", async () => {
    const response = await request(app).get("/cities");
    await expect(response.status).toBe(200);
  });

  test("Fail get all cities", async () => {
    jest.spyOn(City, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/cities")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("get /facilities", () => {
  test("Get all facilities", async () => {
    const response = await request(app).get("/facilities");
    await expect(response.status).toBe(200);
  });

  test("Fail get all cities", async () => {
    jest.spyOn(Facilities, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/facilities")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});
