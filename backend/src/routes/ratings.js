const router = require("express").Router();
const ratingsQueries = require("../queries/ratings");


router.post("/", async (req, res, next) => {
  try {
    const { uid, mid, countryID, rating } = req.body;

    if (!uid || !mid || !countryID || rating == null) {
      return res.status(400).json({ error: "uid, mid, countryID, rating required" });
    }

    await ratingsQueries.upsertRating(uid, mid, countryID, rating);

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});


module.exports = router;
