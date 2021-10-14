const express = require("express");
const router = express.Router();

const TestimonialController = require("../controllers/testimonials.controller");

// get all posts
router.get("/testimonials", TestimonialController.getAll);
router.get("/testimonials/random", TestimonialController.getRandom);
router.get("/testimonials/:id", TestimonialController.getOne);
router.post("/testimonials", TestimonialController.addOne);
router.put("/testimonials/:id", TestimonialController.changeOne);
router.delete("/testimonials/:id", TestimonialController.deleteOne);

// Export
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

// const db = require("../db");

// const app = express();

// // get all posts
// router.route("/testimonials").get((req, res) => {
//   res.json(db.testimonials);
// });

// router.route("/testimonials/:id").get((req, res) => {
//   res.json(db.testimonials.find((elem) => elem.id == req.params.id));
// });

// router.route("/testimonials/random").get((req, res) => {
//   res.json(
//     db.testimonials[`${Math.floor(Math.random() * db.testimonials.length)}`]
//   );
// });

// router.route("/testimonials").post((req, res) => {
//   db.testimonials.push({
//     id: uuidv4(),
//     author: req.body.author,
//     text: req.body.text,
//   });
//   res.json({ message: "OK" });
// });

// router.route("/testimonials/:id").put((req, res) => {
//   const testimonial = db.testimonials.find((elem) => elem.id == req.params.id);
//   if (!testimonial) {
//     res.json({ message: "Not ok!" });
//   } else {
//     testimonial.author = req.body.author;
//     testimonial.text = req.body.text;
//     res.json({ message: "OK" });
//   }
// });

// router.route("/testimonials/:id").delete((req, res) => {
//   const index = db.testimonials.findIndex((item) => item.id == req.params.id);
//   db.testimonials.splice(index, 1);
//   res.json({ message: "OK" });
// });

// // Export
// module.exports = router;
