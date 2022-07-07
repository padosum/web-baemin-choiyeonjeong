const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", { title: "Login", bundle: "/login.js" });
});

module.exports = router;
