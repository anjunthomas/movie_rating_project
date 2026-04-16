const db = require("../db");


async function createUser(email, username, password) {
  const [result] = await db.query(
    "INSERT INTO `user` (email, username, password) VALUES (?, ?, ?)",
    [email, username, password]
  );

  return result.insertId;
}


async function getUser(uid) {
  const [[user]] = await db.query(
    "SELECT uid, email, username FROM `user` WHERE uid = ?",
    [uid]
  );

  return user;
}


async function getUserByLogin(email, password) {
  const [[user]] = await db.query(
    "SELECT uid, email, username FROM `user` WHERE email = ? AND password = ?",
    [email, password]
  );

  return user;
}


module.exports = { createUser, getUser, getUserByLogin };
