var express = require("express");
var router = express.Router();
var news_controller = require("../controllers/bulletinsController");

router.get("/", news_controller.list);
router.get("/:id", news_controller.detail);

module.exports = router;
