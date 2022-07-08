import express from "express";
import session from "../public/javascripts/session.js";
const router = express.Router();

const checkSessionExist = async (req, res, next) => {
  const s = await session.findSession(req.cookies.loginSession);
  if (s) {
    req.isLogin = true;
    req.name = s.userInfo.name;
  } else {
    req.isLogin = false;
  }
  next();
};

/* GET home page. */
router.get("/", checkSessionExist, (req, res, next) => {
  // if (!req.isLogin) {
  //   res.join({ result: "none" });
  // }

  // res.json({
  //   result: "find",
  //   name: req.name,
  // });

  res.render("index", { title: "My배민", name: req.name });
});

export default router;
