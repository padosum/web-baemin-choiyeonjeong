import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.post("/register_process", async (req, res, next) => {
  const { body: user } = req;
  const { email, password, nickname, birth } = user;

  await db.read();

  db.data ||= { users: [] };

  db.data.users.push({
    email,
    password,
    nickname,
    birth,
  });

  await db.write();
  res.sendStatus(200);
});

export default router;
