const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const server = require("../server.js");
const Concert = require("../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts/performer/:performer", () => {
  before(async () => {
    const testConcertOne = new Concert({
      id: 1,
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      day: 1,
      image: "a.jpg",
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      id: 2,
      performer: "John Doe",
      genre: "R&B",
      price: 30,
      day: 2,
      image: "a.jpg",
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      id: 3,
      performer: "Rebekah Parker",
      genre: "Pop",
      price: 35,
      day: 3,
      image: "a.jpg",
    });
    await testConcertThree.save();

    const testConcertFour = new Concert({
      id: 4,
      performer: "Rebekah Parker",
      genre: "R&B",
      price: 40,
      day: 3,
      image: "a.jpg",
    });
    await testConcertFour.save();

    const testConcertFive = new Concert({
      id: 5,
      performer: "Maybell Haley",
      genre: "Pop",
      price: 40,
      day: 1,
      image: "a.jpg",
    });
    await testConcertFive.save();

    const testConcertSix = new Concert({
      id: 6,
      performer: "Maybell Haley",
      genre: "Rock",
      price: 25,
      day: 2,
      image: "a.jpg",
    });
    await testConcertSix.save();
  });

  it("should return right concerts on a right day", async () => {
    const day = 1;
    const res = await request(server).get(`/api/concerts/day/${day}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("should return right output when wrong parameter", async () => {
    const day = "John";
    const res = await request(server).get(`/api/concerts/day/${day}`);
    expect(res.status).to.be.equal(500);
  });

  it("should return right output when no parameter", async () => {
    const day = "";
    const res = await request(server).get(`/api/concerts/day/${day}`);
    expect(res.status).to.be.equal(500);
  });

  it("should return right output when wrong parameter type", async () => {
    const day = "123";
    const res = await request(server).get(`/api/concerts/day/${day}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(0);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
