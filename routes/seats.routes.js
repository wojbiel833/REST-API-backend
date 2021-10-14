const express = require("express");
const router = express.Router();

const SeatController = require("../controllers/seats.controller");

// get all posts
router.get("/seats", SeatController.getAll);
router.get("/seats/random", SeatController.getRandom);
router.get("/seats/:id", SeatController.getOne);
router.post("/seats", SeatController.addOne);
router.put("/seats/:id", SeatController.changeOne);
router.delete("/seats/:id", SeatController.deleteOne);

// Export
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");
// const socket = require("socket.io");

// const db = require("../db");

// const app = express();

// // get all posts
// router.route("/seats").get((req, res) => {
//   res.json(db.seats);
// });

// router.route("/seats/:id").get((req, res) => {
//   res.json(db.seats.find((elem) => elem.id == req.params.id));
// });

// router.route("/seats/random").get((req, res) => {
//   res.json(db.seats[`${Math.floor(Math.random() * db.seats.length)}`]);
// });

// router.route("/seats").post((req, res) => {
//   const isTaken = db.seats.some(
//     (el) => el.day === req.body.day && el.seat === req.body.seat
//   );
//   if (isTaken) res.json({ message: "The slot is already taken..." });
//   else {
//     res.json({ message: "The slot is FREE" });
//     db.seats.push({
//       id: uuidv4(),
//       day: req.body.day,
//       seat: req.body.seat,
//     });

//     req.io.emit("seatsUpdated", db.seats);
//     req.io.on("seatsUpdated", (seats) => [...db.seats, seats]);
//   }
// });

// router.route("/seats/:id").put((req, res) => {
//   const testimonial = db.seats.find((elem) => elem.id == req.params.id);
//   if (!testimonial) {
//     res.json({ message: "Not ok!" });
//   } else {
//     testimonial.author = req.body.author;
//     testimonial.text = req.body.text;
//     res.json({ message: "OK" });
//   }
// });

// router.route("/seats/:id").delete((req, res) => {
//   const index = db.seats.findIndex((item) => item.id == req.params.id);
//   db.seats.splice(index, 1);
//   res.json({ message: "OK" });
// });

// // Export
// module.exports = router;
