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


router.post("/", async (req, res, next) => {
  try {
    const { movie_title, release_dt, og_language, countryIDs } = req.body;

    if (!movie_title) return res.status(400).json({ error: "movie_title required" });

    const mid = await moviesQueries.createMovie(movie_title, release_dt, og_language, countryIDs);

    res.status(201).json({ mid });
  } catch (e) {
    next(e);
  }
});


router.put("/:mid", async (req, res, next) => {
  try {
    await moviesQueries.updateMovie(req.params.mid, req.body);

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});


router.delete("/:mid", async (req, res, next) => {
  try {
    await moviesQueries.deleteMovie(req.params.mid);

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});


router.put("/:mid/countries", async (req, res, next) => {
  try {
    const { countryIDs } = req.body;

    if (!countryIDs) return res.status(400).json({ error: "countryIDs required" });

    await moviesQueries.replaceCountries(req.params.mid, countryIDs);

    res.json({ ok: true });
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
