var express = require("express");
var router = express.Router();
var util_controller = require("../controllers/util");
var home_controller = require("../controllers/homeController");

router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});
router.get("/", home_controller.home);

router.get("/ipInfo", function(req, res) {
  res.send(
    req.ipInfo +
      "," +
      req.connection.remoteAddress +
      "," +
      req.headers["x-forwarded-for"]
  );
});

router.get("/get_count", util_controller.get_count);

module.exports = router;
