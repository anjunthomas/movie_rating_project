const db = require("../db");

async function getMovieRatings() {
  const [rows] = await db.query(
    `SELECT m.movie_title, FLOOR(AVG(r.rating)) AS avg_rating, COUNT(r.uid) AS num_ratings
     FROM movie m, ratings r, moviecountry mc
     WHERE m.mid = r.mid AND m.mid = mc.mid
     GROUP BY m.movie_title`
  );
  return rows;
}

async function getUserStats() {
  const [rows] = await db.query(
    `SELECT u.username, COUNT(m.movie_title) AS num_rated, ROUND(AVG(r.rating), 1) AS avg_rating
     FROM movie m, user u, ratings r
     WHERE m.mid = r.mid AND u.uid = r.uid
     GROUP BY u.username`
  );
  return rows;
}

async function getCountryRatings() {
  const [rows] = await db.query(
    `SELECT c.country_nm, FLOOR(AVG(r.rating)) AS avg_rating
     FROM movie m, ratings r, moviecountry mc, country c
     WHERE m.mid = mc.mid AND mc.mid = r.mid AND c.countryID = mc.countryID
     GROUP BY c.country_nm`
  );
  return rows;
}

module.exports = { getMovieRatings, getUserStats, getCountryRatings };