const db = require("../db");

async function listCountries() {
  const [rows] = await db.query(
    "SELECT countryID, country_nm FROM country ORDER BY country_nm"
  );

  return rows;
}

module.exports = { listCountries };
