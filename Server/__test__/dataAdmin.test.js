const app = require("../app");
const request = require("supertest");
const {
  Users,
  BoardingHouses,
  City,
  Categories,
  Sequelize,
  Bookmarks,
} = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const dataCategories = require("../../data/server.json").Categories;
const dataCity = require("../../data/server.json").City;

let access_token = "";
beforeAll(async () => {
  try {
    const dataCitynew = await City.bulkCreate(dataCity);
    const dataCategoriesnew = await Categories.bulkCreate(dataCategories);

    const datausernew = await Users.create({
      fullName: "yantan",
      email: "maung@mail.com",
      password: hashPassword("12345678"),
      phoneNumber: "086363628781",
      role: "Admin",
      address: "Jalan boulevard 1 no 12",
    });
    access_token = signToken({
      id: 1,
      email: "maung@mail.com",
      role: "Admin",
    });

    const databaru = await BoardingHouses.create({
      name: "Kost Kiara 51",
      price: 1100000,
      CategoryId: 1,
      CityId: 1,
      totalRoom: 20,
      UserId: 1,
      description:
        "Kost ini terdiri dari 2 lantai. Tipe kamar B berada di lantai berada di lantai 1 dan lantai 2. Semua kamar di kamar ini memiliki jendela yang menghadap secara langsung ke arah koridor.Tersedia juga layanan pembersihan AC secara rutin setiap 3 bulan sekali. Apabila Anda membutuhkan bantuan, Anda bisa menghubungi penjaga yang bertugas dari pukul 10.00-17.00 WIB.",
      location: Sequelize.fn("ST_GeomFromText", `POINT(-6.131164 106.85564)`),
      mainImg: "https://www.uhb.ac.id/uploads/images/dsc052972_1.jpg",
    });
  } catch (err) {
    console.log(err, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EROR");
  }
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  try {
    await BoardingHouses.destroy({
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
    await Categories.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  } catch (err) {
    console.log(err);
  }
});

//bisa saat menggunaakn data baru dan data after allnya tidak terhapus
describe("get /admin/boardinghouses", () => {
  test("Get all BoardingHouses Admin", async () => {
    const response = await request(app)
      .get("/admin/boardinghouses")
      .set({ access_token });
    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Array));
  });

  test("Fail case get all BoardingHouses Tenant", () => {
    jest.spyOn(BoardingHouses, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/admin/boardinghouses")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("Delete /admin/boardinghouses/:id", () => {
  test("Get all BoardingHouses Admin", async () => {
    const response = await request(app)
      .delete("/admin/boardinghouses/1")
      .set({ access_token })
      .send({
        id: 1,
      });

    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Object));
  });

  test("Fail case get all BoardingHouses Admin", () => {
    jest.spyOn(BoardingHouses, "destroy").mockRejectedValue("Error");
    return request(app)
      .delete("/admin/boardinghouses/2")
      .set({ access_token })
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});
