var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rfs = require("rotating-file-stream");
const expressip = require("express-ip");
var indexRouter = require("./routes/index");
var preRouter = require("./routes/pre");
var cakeRouter = require("./routes/cake");
const newsRouter = require("./routes/news");
var helmet = require("helmet");

// create a rotating write stream
var accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log")
});

var app = express();
app.set("trust proxy", true);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("combined", { stream: accessLogStream }));
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

app.get(
  "/.well-known/acme-challenge/tZQ9mH_EbyA8mq8NDrGrspBwuyvmSbpbmhHym6xywTo",
  function(req, res) {
    res.send("hello world");
  }
);

app.get(
  "/.well-known/acme-challenge/O064iyemLXSqQXJM2nQa22OwUsq3nOm1Nyi2tUbg8iU",
  function(req, res) {
    res.send("hello world");
  }
);

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
