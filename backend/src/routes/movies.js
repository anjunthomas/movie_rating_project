const router = require("express").Router();
const moviesQueries = require("../queries/movies");
const ratingsQueries = require("../queries/ratings");


router.get("/", async (req, res, next) => {
  try {
    const { q, limit, offset } = req.query;

    res.json(await moviesQueries.searchMovies(q, limit, offset));
  } catch (e) {
    next(e);
  }
});


router.get("/:mid", async (req, res, next) => {
  try {
    const movie = await moviesQueries.getMovie(req.params.mid);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie);
  } catch (e) {
    next(e);
  }
});


router.get("/:mid/ratings", async (req, res, next) => {
  try {
    res.json(await ratingsQueries.getRatingsByMovie(req.params.mid));
  } catch (e) {
    next(e);
  }
});


module.exports = router;
