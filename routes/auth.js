import express from "express";
import db from "../db/db.js";
import session from "../public/javascripts/session.js";
const router = express.Router();

router.post("/register_process", async (req, res, next) => {
  try {
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
    res.status(200).send({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  res.cookie("loginSession", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.redirect("/");
});

router.post("/login_check", async (req, res, next) => {
  const { body } = req;
  const { id, password } = body;

  await db.read();

  const findUser = db.data.users.find(
    user => user.email === id && user.password === password
  );

  if (findUser) {
    const sessionId = session.generateSessionID();
    session.addSession(sessionId, findUser.email, findUser.nickname);

    res.cookie("loginSession", sessionId);
    res.json({
      success: true,
      name: findUser.name,
    });
  } else {
    res.json({
      success: false,
      message: "아이디 또는 비밀번호가 일치하지 않습니다.",
    });
  }
});

export default router;
