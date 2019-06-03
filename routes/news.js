var express = require("express");
var router = express.Router();
var news_controller = require("../controllers/bulletinsController");

router.get("/", news_controller.list);
router.get("/n/:id", news_controller.detail);
router.get("/get_news", news_controller.get_news);

module.exports = router;
