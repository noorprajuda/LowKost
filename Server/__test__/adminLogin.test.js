const app = require("../app");
const request = require("supertest");
const { Users } = require("../models");
const {
  signToken,
  verifyToken,
  hashPassword,
  compareHash,
} = require("../helpers/helpers");

let userCrate = {
  fullName: "rivaldiHeriyan",
  email: "admin@mail.com",
  password: "123456",
  phoneNumber: "021354687",
  role: "Admin",
  address: "Jl.kenangan",
};

let admin_acces_token = "";
beforeAll((done) => {
  Users.create(userCrate)
    .then((registeredUser) => {
      user_acces_token = signToken({
        id: registeredUser.id,
        email: registeredUser.email,
        role: registeredUser.role,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

afterAll((done) => {
  Users.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then((res) => {
      console.log("After All test all Users are destroyed and reset");
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});

// describe("post /user/register", () => {
//   test("succes register", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "heriyan@mail.com",
//       password: "123456",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(201);
//     await expect(response.body).toEqual(expect.any(Object));
//     await expect(response.body).toHaveProperty("message", expect.any(String));
//   });

//   test("failed case: email Empty", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "",
//       password: "123456",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain("Email is required");
//   });

//   test("failed case: email Null", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       password: "123456",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain("Email is required");
//   });

//   test("failed case: email must be email format", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "rival",
//       password: "123456",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain("Must be a valid email");
//   });

//   test("failed case: password Null", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "heriyan@mail.com",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain("Password is required");
//   });

//   test("failed case: password Empty", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "heriyan@mail.com",
//       password: "",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain("Password is required");
//   });
//   test("failed case: password Minimum length", async () => {
//     const userData = {
//       fullName: "rivaldiHeriyan",
//       email: "heriyan@mail.com",
//       password: "1234",
//     };
//     const response = await request(app).post("/owner/register").send(userData);
//     await expect(response.status).toBe(400);
//     await expect(response.body.message).toContain(
//       "Password minimum length is 5 characters"
//     );
//   });
// });

describe("post /login", () => {
  test("seccess login", async () => {
    const userData = {
      email: "admin@mail.com",
      password: "123456",
    };
    const response = await request(app).post("/login").send(userData);
    await expect(response.status).toBe(200);
    await expect(response.body).toHaveProperty(
      "access_token",
      expect.any(String)
    );
    await expect(response.body).toHaveProperty("fullName");
  });

  test("failed case", async () => {
    const userData = {
      email: "admin@mail.com",
      password: "12345678",
    };
    const response = await request(app).post("/login").send(userData);
    await expect(response.status).toBe(401);
    await expect(response.body.message).toContain("Invalid email/password");
  });
});
