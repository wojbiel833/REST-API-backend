const sanitize = require("mongo-sanitize");
const Concert = require("../models/concert.model.js");

// router.get("/concerts/performer/:performer"
exports.getPerformer = async (req, res) => {
  try {
    const cleanPerformer = sanitize(req.params.performer);
    const result = await Concert.find({
      performer: { $eq: cleanPerformer },
    });
    if (!result.length) res.status(404).json({ message: "Not found!" });
    else res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// router.get("/concerts/genre/:genre",
exports.getGenre = async (req, res) => {
  try {
    const result = await Concert.find({
      genre: { $eq: req.params.genre },
    });
    if (!result) res.status(404).json({ message: "Not found!" });
    else res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// router.get("/concerts/price/day/:day",
exports.getDay = async (req, res) => {
  try {
    const result = await Concert.find({
      day: { $eq: req.params.day },
    });
    if (!result) res.status(404).json({ message: "Not found!" });
    else res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// router.get(
//   "/concerts/price/:price_min/:price_max",
exports.getPriceScope = async (req, res) => {
  try {
    if (!req.params.price_min || !req.params.price_min)
      throw Error("Wrong input!");

    const result = await Concert.find({
      $and: [
        { price: { $gte: req.params.price_min } },
        { price: { $lte: req.params.price_max } },
      ],
    });
    if (!result) res.status(404).json({ message: "Not found!" });
    else res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
