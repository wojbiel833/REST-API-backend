const sanitize = require("mongo-sanitize");

const Concert = require("../models/concert.model.js");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(505).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = MathFloor(Math.random * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: "Not found" });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: "Not found!" });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const cleanName = sanitize(name);

    const newConcert = new Concert({
      name: cleanName,
      id: 11,
      day: 1,
      price: 30,
      performer: "WB",
      genre: "Rock",
      image: "aaa.jpg",
    });
    await newConcert.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;

  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { name: name } });
      res.json({ message: `${concert} was changed!` });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id });
    }
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
