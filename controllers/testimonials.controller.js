const Testimonial = require("../models/concert.model.js");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(505).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = MathFloor(Math.random * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: "Not found" });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: "Not found!" });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newConcert = new Testimonial({ name: name });
    await newDepartment.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.statur(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        { $set: { name: name } }
      );
      res.json({ message: `${testimonial} was changed!` });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
    }
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
