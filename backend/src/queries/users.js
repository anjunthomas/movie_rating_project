const db = require("../db");


async function createUser(email, username, password) {
  const [[{ next_uid }]] = await db.query(
    "SELECT COALESCE(MAX(uid), 0) + 1 AS next_uid FROM `user`"
  );

  await db.query(
    "INSERT INTO `user` (uid, email, username, password) VALUES (?, ?, ?, ?)",
    [next_uid, email, username, password]
  );

  return next_uid;
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
