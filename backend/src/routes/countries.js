const router = require("express").Router();
const countryQueries = require("../queries/countries");

router.get("/", async (req, res, next) => {
  try {
    res.json(await countryQueries.listCountries());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
