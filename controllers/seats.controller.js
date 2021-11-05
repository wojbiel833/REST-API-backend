const Seat = require("../models/seat.model.js");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = MathFloor(Math.random * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: "Not found" });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: "Not found!" });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newSeat = new Seat({ name: name });
    await newSeat.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;

  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { name: name } });
      res.json({ message: `${seat} was changed!` });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
    }
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
