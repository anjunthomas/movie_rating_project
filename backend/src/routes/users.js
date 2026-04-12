const router = require("express").Router();
const usersQueries = require("../queries/users");
const watchlistQueries = require("../queries/watchlist");
const ratingsQueries = require("../queries/ratings");


router.post("/", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.status(400).json({ error: "email, username, and password required" });

    const uid = await usersQueries.createUser(email, username, password);

    res.status(201).json({ uid });
  } catch (e) {
    next(e);
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await usersQueries.getUserByLogin(email, password);

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.json(user);
  } catch (e) {
    next(e);
  }
});


router.get("/:uid", async (req, res, next) => {
  try {
    const user = await usersQueries.getUser(req.params.uid);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (e) {
    next(e);
  }
});


router.get("/:uid/ratings", async (req, res, next) => {
  try {
    res.json(await ratingsQueries.getRatingsByUser(req.params.uid));
  } catch (e) {
    next(e);
  }
});


router.get("/:uid/watchlist", async (req, res, next) => {
  try {
    res.json(await watchlistQueries.getWatchlist(req.params.uid));
  } catch (e) {
    next(e);
  }
});


router.post("/:uid/watchlist", async (req, res, next) => {
  try {
    const { mid } = req.body;

    if (!mid) return res.status(400).json({ error: "mid required" });

    await watchlistQueries.addToWatchlist(req.params.uid, mid);

    res.status(201).json({ ok: true });
  } catch (e) {
    next(e);
  }
});


router.delete("/:uid/watchlist/:mid", async (req, res, next) => {
  try {
    await watchlistQueries.removeFromWatchlist(req.params.uid, req.params.mid);

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});


module.exports = router;
