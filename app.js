const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const themeRouter = require("./routes/theme");
const systemConfig = require("./config/system");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("component", path.join(__dirname, "component"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.locals.systemConfig = systemConfig.prefixTheme;
app.locals.lala = "lalala";

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(`/${systemConfig.prefixTheme}`, themeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://nguyenminhtuyenkt98:19981998T@dbnodejs.oqvydox.mongodb.net/dataTranningNodej"
  );
  console.log("connect thành công");
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("page/error/error");
});

module.exports = app;
