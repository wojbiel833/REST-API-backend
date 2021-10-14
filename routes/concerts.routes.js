const express = require("express");
const router = express.Router();

const ConcertController = require("../controllers/concerts.controller");

// get all posts
router.get("/concerts", ConcertController.getAll);
router.get("/concerts/random", ConcertController.getRandom);
router.get("/concerts/:id", ConcertController.getOne);
router.post("/concerts", ConcertController.addOne);
router.put("/concerts/:id", ConcertController.changeOne);
router.delete("/concerts/:id", ConcertController.deleteOne);

// Export
module.exports = router;

// przed DB connection
// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

// const db = require("../db");

// const app = express();

// // get all posts
// router.route("/concerts").get((req, res) => {
//   res.json(db.concerts);
// });

// router.route("/concerts/:id").get((req, res) => {
//   res.json(db.concerts.find((elem) => elem.id == req.params.id));
// });

// router.route("/concerts/random").get((req, res) => {
//   res.json(db.concerts[`${Math.floor(Math.random() * db.concerts.length)}`]);
// });

// router.route("/concerts").post((req, res) => {
//   db.concerts.push({
//     id: uuidv4(),
//     author: req.body.author,
//     text: req.body.text,
//   });
//   res.json({ message: "OK" });
// });

// router.route("/concerts/:id").put((req, res) => {
//   const testimonial = db.concerts.find((elem) => elem.id == req.params.id);
//   if (!testimonial) {
//     res.json({ message: "Not ok!" });
//   } else {
//     testimonial.author = req.body.author;
//     testimonial.text = req.body.text;
//     res.json({ message: "OK" });
//   }
// });

// router.route("/concerts/:id").delete((req, res) => {
//   const index = db.concerts.findIndex((item) => item.id == req.params.id);
//   db.concerts.splice(index, 1);
//   res.json({ message: "OK" });
// });

// // Export
// module.exports = router;
