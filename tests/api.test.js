const app = require("../index");

const supertest = require("supertest"); // const chai = require("chai");
const { describe, it } = require("mocha");
require("dotenv").config();

describe("GET /", () => {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/ping")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("POST /", () => {
  it("it should has status code 200", function (done) {
    supertest(app)
      .post("/api/login")
      .send({
        username: "username1d2",
        password: "P@ssw0rd!@#",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
