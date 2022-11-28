import { createRequire } from "module";
const require = createRequire(import.meta.url);
const createError = require("http-errors");
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import loginRouter from "./routes/login.js";
import joinRouter from "./routes/join.js";
import authRouter from "./routes/auth.js";

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
app.use("/api", express.static(path.join(__dirname, "api")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/join", joinRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(500).json({
    status: "error",
    message: err.message,
  });
  res.render("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Start App");
});
