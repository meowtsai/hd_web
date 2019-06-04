var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressip = require("express-ip");
var indexRouter = require("./routes/index");
var preRouter = require("./routes/pre");
var cakeRouter = require("./routes/cake");
const newsRouter = require("./routes/news");
var helmet = require("helmet");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressip().getIpInfoMiddleware);
app.use(helmet());

// agent
app.use(function(req, res, next) {
  var useragent = req.headers["user-agent"];
  //console.log("app env=" + app.get('env'));
  //console.log("useragent=" + useragent);
  //process.env.NODE_ENVconsole.log("process.env. env=" + JSON.stringify(process.env.NODE_ENV));

  if (useragent.indexOf("Mobi") > 0) {
    res.locals.ismoble = true;
    //console.log("is_mobile=" + res.locals.ismoble);
  } else {
    res.locals.ismoble = false;
    //console.log("is_mobile=" + res.locals.ismoble);
  }
  next();
});

app.use("/", indexRouter);
app.use("/event", preRouter);
app.use("/cake", cakeRouter);
app.use("/news", newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
