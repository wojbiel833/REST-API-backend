const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/search.controller");

router.get("/concerts/performer/:performer", SearchController.getPerformer);
router.get("/concerts/genre/:genre", SearchController.getGenre);
router.get("/concerts/day/:day", SearchController.getDay);
router.get(
  "/concerts/price/:price_min/:price_max",
  SearchController.getPriceScope
);

// Export
module.exports = router;
