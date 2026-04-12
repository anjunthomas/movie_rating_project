const db = require("../db");


async function searchMovies(q, limit = 20, offset = 0) {
  const [rows] = await db.query(
    `SELECT mid, movie_title, release_dt, og_language
     FROM movie
     WHERE LOWER(movie_title) LIKE LOWER(CONCAT('%', ?, '%'))
     ORDER BY movie_title
     LIMIT ? OFFSET ?`,
    [q || "", Number(limit), Number(offset)]
  );

  return rows;
}


async function getMovie(mid) {
  const [[movie]] = await db.query(
    `SELECT m.mid, m.movie_title, m.release_dt, m.og_language,
            ROUND(AVG(r.rating), 2) AS avg_rating,
            COUNT(r.rating) AS rating_count
     FROM movie m
     LEFT JOIN ratings r ON r.mid = m.mid
     WHERE m.mid = ?
     GROUP BY m.mid, m.movie_title, m.release_dt, m.og_language`,
    [mid]
  );

  if (!movie) return null;

  const [countries] = await db.query(
    `SELECT c.countryID, c.country_nm
     FROM country c
     JOIN moviecountry mc ON mc.countryID = c.countryID
     WHERE mc.mid = ?`,
    [mid]
  );

  movie.countries = countries;

  return movie;
}

async function countMovies(q){
  const [[ { count }]] = await db.query(
    `SELECT COUNT(*) as count FROM movie WHERE LOWER(movie_title) LIKE LOWER(CONCAT('%', ?, '%'))`,
    [q || ""]
  );
  return count;
}


module.exports = { searchMovies, getMovie, countMovies };
