// var createError = require("http-errors");
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const createError = require("http-errors");
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import { indexRouter } from "./routes/index.js";
import { loginRouter } from "./routes/login.js";
import { joinRouter } from "./routes/join.js";
import { authRouter } from "./routes/auth.js";

var app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/db", express.static(path.join(__dirname, "db")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.post("/login_check", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  res.send(`id : ${id}, pw: ${pw}`);
});
app.use("/join", joinRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Start App");
});
