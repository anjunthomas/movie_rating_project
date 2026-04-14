const db = require("../db");


async function getWatchlist(uid) {
  const [rows] = await db.query(
    `SELECT m.mid, m.movie_title, m.release_dt, m.og_language,
            ROUND(AVG(r.rating), 2) AS avg_rating
     FROM watchlist w
     JOIN movie m ON m.mid = w.mid
     LEFT JOIN ratings r ON r.mid = m.mid
     WHERE w.uid = ?
     GROUP BY m.mid, m.movie_title, m.release_dt, m.og_language`,
    [uid]
  );

  return rows;
}


async function addToWatchlist(uid, mid) {
  await db.query(
    "INSERT INTO watchlist (uid, mid) VALUES (?, ?)",
    [uid, mid]
  );
}


async function removeFromWatchlist(uid, mid) {
  await db.query(
    "DELETE FROM watchlist WHERE uid = ? AND mid = ?",
    [uid, mid]
  );
}


module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
