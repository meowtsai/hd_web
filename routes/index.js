var express = require('express');
var router = express.Router();
var util_controller =  require('../controllers/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get_count', util_controller.get_count);

module.exports = router;
