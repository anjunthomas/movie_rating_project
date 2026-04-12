const db = require("../db");

async function upsertRating(uid, mid, countryID, rating) {
  await db.query(
    `INSERT INTO ratings (uid, mid, countryID, rating) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE countryID = VALUES(countryID), rating = VALUES(rating)`,
    [uid, mid, countryID, rating]
  );
}

async function getRatingsByMovie(mid) {
  const [
    [summary]
  ] = await db.query(
    `SELECT ROUND(AVG(rating), 2) AS avg_rating, COUNT(*) AS count
     FROM ratings
     WHERE mid = ?`,
    [mid]
  );

  const [byCountry] = await db.query(
    `SELECT c.country_nm, r.countryID,
            ROUND(AVG(r.rating), 2) AS avg_rating,
            COUNT(*) AS count
     FROM ratings r
     JOIN country c ON c.countryID = r.countryID
     WHERE r.mid = ?
     GROUP BY r.countryID, c.country_nm`,
    [mid]
  );

  return { ...summary, by_country: byCountry };
}

async function getRatingsByUser(uid) {
  const [
    rows
  ] = await db.query(
    `SELECT r.mid, m.movie_title, r.rating, r.countryID
     FROM ratings r
     JOIN movie m ON m.mid = r.mid
     WHERE r.uid = ?`,
    [uid]
  );

  return rows;
}

module.exports = { upsertRating, getRatingsByMovie, getRatingsByUser };
