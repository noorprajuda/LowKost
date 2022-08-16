const app = require("../app");
const request = require("supertest");
const {
  Users,
  BoardingHouses,
  Categories,
  Images,
  Facilities,
  BoardingHouseFacilities,
  City,
  Rules,
  BoardingHouseRules,
  sequelize,
  Sequelize,
} = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const dataCategories = require("../../data/server.json").Categories;
const dataCity = require("../../data/server.json").City;
const dataImages = require("../../data/server.json").Images;
const dataFacilities = require("../../data/server.json").Facilities;
const dataRulesw = require("../../data/server.json").Rules;

let access_token = "";
beforeAll(async () => {
  try {
    const dataCitynew = await City.bulkCreate(dataCity);
    const dataCategoriesnew = await Categories.bulkCreate(dataCategories);
    const dataRUlesNEW = await Rules.bulkCreate(dataRulesw);
    const dataFaciltynew = await Facilities.bulkCreate(dataFacilities);

    const datausernew = await Users.create({
      fullName: "Admin 1",
      email: "admin@mail.com",
      password: hashPassword("12345678"),
      phoneNumber: "086363628781",
      role: "Tenant",
      address: "Jalan boulevard 1 no 12",
    });
    access_token = signToken({
      id: 1,
      email: "admin@mail.com",
      role: "Tenant",
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
    console.log(databaru, "<<<<<<data baru ini idnya ada kayanay");

    const boadringhousesF = await BoardingHouseRules.create({
      FacilityId: 1,
      BoardingHouseId: 1,
    });

    const boadringhousesR = await BoardingHouseFacilities.create({
      RuleId: 1,
      BoardingHouseId: 1,
    });
    // const dataImagenew = await Images.bulkCreate(dataImages);
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
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    await Images.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  } catch (err) {
    console.log(err);
  }
});

describe("get /owner/boardinghouses", () => {
  test("Get all BoardingHouses Owner", async () => {
    const response = await request(app)
      .get("/owner/boardinghouses")
      .set({ access_token });
    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Array));
  });

  test("Fail case get all BoardingHouses Tenant", () => {
    jest.spyOn(BoardingHouses, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/owner/boardinghouses")
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

describe("get  /owner/boardinghouses/:id", () => {
  test("Get BoardingHouses Id Owner", (done) => {
    request(app)
      .get("/owner/boardinghouse/1")
      .set({ access_token })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(200);
        // console.log(body, "<<<");
        expect(body).toEqual(expect.any(Object));
        return done();
      });
  });

  test("Fail case get  Tenant", () => {
    jest.spyOn(BoardingHouses, "findByPk").mockRejectedValue("Error");
    return request(app)
      .get("/owner/boardinghouse/1")
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

describe("post  /owner/boardinghouses", () => {
  test("post BoardingHouses Owner", () => {
    request(app)
      .post("/owner/boardinghouses")
      .set({ access_token })
      .send({
        name: "Kost Kiara 51",
        price: 1100000,
        CategoryId: 1,
        CityId: 1,
        totalRoom: 20,
        description:
          "Kost ini terdiri dari 2 lantai. Tipe kamar B berada di lantai berada di lantai 1 dan lantai 2. Semua kamar di kamar ini memiliki jendela yang menghadap secara langsung ke arah koridor.Tersedia juga layanan pembersihan AC secara rutin setiap 3 bulan sekali. Apabila Anda membutuhkan bantuan, Anda bisa menghubungi penjaga yang bertugas dari pukul 10.00-17.00 WIB.",
        mainImg: "https://www.uhb.ac.id/uploads/images/dsc052972_1.jpg",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        StackRules: [
          {
            id: 1,
          },
        ],
        StackImages: [
          {
            imgUrl:
              "https://infokost.b-cdn.net/wp-content/uploads/2022/02/04022022164399628044.jpeg",
          },
        ],
        StackFacilities: [
          {
            id: 1,
          },
        ],
      })
      .end((err, res) => {
        console.log(err);
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        // console.log(body, "<<<");
        expect(body).toEqual(expect.any(Object));
        return done();
      });
  });

  test("Fail case get  Tenant", () => {
    request(app)
      .post("/owner/boardinghouse")
      .set({ access_token })
      .send({})
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("Put /owner/boardinghouse/:id", () => {
  //test ada yang salah
  test("Put BoardingHouses Owner", async () => {
    const response = await request(app)
      .put("/owner/boardinghouse/1")
      .set({ access_token })
      .send({
        name: "Kost Kiara 10",
        price: 10,
        CategoryId: 1,
        CityId: 1,
        totalRoom: 20,
        description:
          "Kost ini terdiri dari 2 lantai. Tipe kamar B berada di lantai berada di lantai 1 dan lantai 2. Semua kamar di kamar ini memiliki jendela yang menghadap secara langsung ke arah koridor.Tersedia juga layanan pembersihan AC secara rutin setiap 3 bulan sekali. Apabila Anda membutuhkan bantuan, Anda bisa menghubungi penjaga yang bertugas dari pukul 10.00-17.00 WIB.",
        mainImg: "https://www.uhb.ac.id/uploads/images/dsc052972_1.jpg",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        StackRules: [
          {
            id: 1,
          },
        ],
        StackImages: [
          {
            imgUrl:
              "https://infokost.b-cdn.net/wp-content/uploads/2022/02/04022022164399628044.jpeg",
          },
        ],
        StackFacilities: [
          {
            id: 1,
          },
        ],
      });
    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Object));
  });

  test("Fail case get all BoardingHouses Tenant", () => {
    request(app)
      .put("/owner/boardinghouse/1")
      .set({ access_token })
      .send({})
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("Delete /owner/boardinghouses", () => {
  //test ada yang salah
  test("Delete BoardingHouses Owner", async () => {
    const response = await request(app)
      .delete("/owner/boardinghouse/1")
      .set({ access_token });
    // .send({
    //   id: 1,
    // });
    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Object));
  });

  test("Fail case get all BoardingHouses Tenant", () => {
    request(app)
      .delete("/owner/boardinghouse/1")
      .set({ access_token })
      .send({})
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});
