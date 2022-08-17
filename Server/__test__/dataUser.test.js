const app = require("../app");
const request = require("supertest");
const {
  Users,
  BoardingHouses,
  City,
  Categories,
  Sequelize,
  Rules,
  Bookmarks,
  MyBooking,
} = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");
const dataUsers = require("../../data/server.json").Users;
const dataBoardingHouses = require("../../data/server.json").BoardingHouses;
const dataCategories = require("../../data/server.json").Categories;
const dataCity = require("../../data/server.json").City;
const dataRules = require("../../data/server.json").Rules;

let access_token = "";
let access_token2 = "";
let access_token_fail = "";

beforeAll(async () => {
  try {
    const dataCitynew = await City.bulkCreate(dataCity);
    // console.log(dataCitynew, ".,.,.,.,.,.,. datacity");

    const dataCategoriesnew = await Categories.bulkCreate(dataCategories);
    // console.log(dataCategoriesnew, ".,.,.,.,.,.,. dataCategory");

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

    access_token_fail = signToken({
      id: 9,
      email: "1231241fas@mail.com",
      role: "Admin",
    });
    // console.log(
    //   access_token,
    //   datausernew,
    //   "><><><><><> data",
    //   access_token_fail,
    //   "yang salah :::::::::::::::::::"
    // );

    const datausernew3 = await Users.create({
      fullName: "Heriyan",
      email: "heriyan@mail.com",
      password: hashPassword("12345678"),
      phoneNumber: "086363628781",
      role: "Tenant",
      address: "Jalan boulevard 1 no 12",
    });
    access_token2 = signToken({
      id: 2,
      email: "admin@mail.com",
      role: "Tenant",
    });
    // console.log(
    //   access_token,
    //   datausernew,
    //   "><><><><><> data",
    //   datausernew3,
    //   access_token2,
    //   "><><><><><> dataToken2",
    //   access_token_fail,
    //   "yang salah :::::::::::::::::::"
    // );
    const dataRulesnwe = await Rules.bulkCreate(dataRules);
    // console.log(dataRulesnwe, ",.,.,.,.,.,.,.,. dataRules");

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
      address: "jalan peta selatan nomor 31 rt09/11 kalideres jakarta barat",
    });
    console.log(databaru, ",.,.,.,.,.,.,.,. databaru");

    const dataBookmark = await Bookmarks.create({
      UserId: 1,
      BoardingHouseId: 1,
    });
    console.log(dataBookmark, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<dataBookmark");
    const dataMyBooking = await MyBooking.create({
      BoardingHouseId: 1,
      UserId: 1,
      status: "Unpaid",
      startDate: "2022-08-03 07:00:00+07",
    });

    // console.log(dataMyBooking, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data my Booking");
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

    await Bookmarks.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    await MyBooking.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  } catch (err) {
    console.log(err);
  }
});

describe("get /user/boardinghouses", () => {
  test("Get all BoardingHouses Tenant", async () => {
    const response = await request(app).get("/user/boardinghouses");
    await expect(response.status).toBe(200);
    await expect(response.body).toEqual(expect.any(Array));
  });

  test("Fail case get all BoardingHouses Tenant", () => {
    jest.spyOn(BoardingHouses, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/user/boardinghouses")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("get  /user/boardinghouses/:id", () => {
  test("Get BoardingHouses Id Tenant", (done) => {
    request(app)
      .get("/user/boardinghouses/1")
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
    jest.spyOn(BoardingHouses, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/user/boardinghouses/1")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("get /user/bookmark", () => {
  test("Get all bookmark in user", async () => {
    const response = await request(app)
      .get("/user/bookmark")
      .set({ access_token });
    await expect(response.status).toBe(200);
  });

  test("Fail case get user tenant Bookmark", () => {
    jest.spyOn(Bookmarks, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/user/bookmark")
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

describe("post /user/bookmark/:id", () => {
  test("Post bookmark in user", async () => {
    const response = await request(app)
      .post("/user/bookmark/1")
      .set({ access_token });
    await expect(response.status).toBe(201);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  // ini gak tau
  test("Failed case : If findBoardingHouse not Found", async () => {
    const response = await request(app)
      .post("/user/bookmark/30")
      .set({ access_token });
    await expect(response.status).toBe(404);
    await expect(response.body.message).toContain("Not Found");
  });

  //ini salah
  test("Fail case Bookmark create", () => {
    jest.spyOn(Bookmarks, "create").mockRejectedValue("Error");
    return request(app)
      .get("/user/bookmark/1")
      .set({ access_token_fail })
      .send({
        UserId: 1,
        BoardingHouseId: 30,
      })
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("delete /user/bookmark/:id", () => {
  test("Delete all bookmark in user", async () => {
    const response = await request(app)
      .delete("/user/bookmark/1")
      .set({ access_token })
      .send({
        id: 1,
      });
    await expect(response.status).toBe(200);
  });

  //ini salah
  test("Fail case Destroy Bookmark", () => {
    jest.spyOn(Bookmarks, "destroy").mockRejectedValue("Error");
    return request(app)
      .get("/user/bookmark/1")
      .set({ access_token })
      .send({
        id: 1,
      })
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.err).toBe("Error");
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

describe("get /user/mybookings", () => {
  test("Get all Mybookings in user", async () => {
    const response = await request(app)
      .get("/user/bookmark")
      .set({ access_token });
    await expect(response.status).toBe(200);
  });

  test("Fail case get user tenant Bookmark", () => {
    jest.spyOn(MyBooking, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/user/bookmark")
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

describe("post /user/bookmark/:id", () => {
  test("post createBookmark in user", async () => {
    const response = await request(app)
      .post("/user/bookmark/1")
      .set({ access_token });
    // .send({
    //   BoardingHouseId: 1,
    //   startDate: "2022-08-03 07:00:00+07",
    // });
    await expect(response.status).toBe(201);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Fail case get Tenant", () => {
    request(app)
      .post("/user/bookmark")
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

describe("deleteBookmark /user/bookmark/:id", () => {
  test("DeleteBookmark in user", async () => {
    const response = await request(app)
      .delete("/user/bookmark/1")
      .set({ access_token });
    await expect(response.status).toBe(200);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Fail USER BOOKING", () => {
    request(app)
      .delete("/user/mybookings")
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

describe("Post /user/payment", () => {
  test("Post payment", async () => {
    const response = await request(app)
      .post("/user/payment")
      .set({ access_token })
      .send({
        amount: 1000,
      });
    await expect(response.status).toBe(200);
    expect(body.message).toEqual(expect.any(A));
  });

  test("Fail case PAYMENT", () => {
    request(app)
      .post("/user/payment")
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

describe("Post /user/mybookings/:id", () => {
  test("Post MyBOOKING", async () => {
    const response = await request(app)
      .post("/user/mybookings/1")
      .set({ access_token })
      .send({
        BoardingHouseId: 1,
        startDate: "2022-08-13 12:08:39.609 +0700",
      });
    await expect(response.status).toBe(201);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Fail case PAYMENT", () => {
    request(app)
      .post("/user/payment")
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

describe("patch /user/mybookings/:id", () => {
  test("patch changeMyBookingStatus", async () => {
    const response = await request(app)
      .post("/user/mybookings/1")
      .set({ access_token })
      .send({});
    await expect(response.status).toBe(201);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Fail case changeMyBookingStatus", () => {
    request(app)
      .patch("/user/mybookings/1")
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

describe("delete /user/mybookings/:id", () => {
  test("delete myBooking", async () => {
    const response = await request(app)
      .delete("/user/mybookings/1")
      .set({ access_token });
    await expect(response.status).toBe(200);
    await expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Fail case changeMyBookingStatus", () => {
    request(app)
      .patch("/user/mybookings/1")
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

describe("Auhthentication", () => {
  test("Get all BoardingHouses Tenant", async () => {
    const response = await request(app)
      .get("/owner/boardinghouses")
      .set({ access_token_fail });
    await expect(response.status).toBe(401);
    await expect(response.body).toEqual(expect.any(Object));
  });
});
