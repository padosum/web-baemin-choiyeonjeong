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

router.post("/login_check", async (req, res, next) => {
  const { body } = req;
  const { id, password } = body;

  await db.read();

  console.log(db.data);

  const findUser = db.data.users.find(
    (user) => user.email === id && user.password === password
  );

  if (findUser) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: "아이디 또는 비밀번호가 일치하지 않습니다.",
    });
  }
});

export default router;
