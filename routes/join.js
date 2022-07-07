import express from "express";
const router = express.Router();

router.get("/agree", (req, res, next) => {
  res.render("agree", { title: "회원가입" });
});

router.get("/certification", (req, res, next) => {
  res.render("certification", { title: "회원가입" });
});

router.get("/details", (req, res, next) => {
  res.render("details", { title: "회원가입" });
});

export { router as joinRouter };
