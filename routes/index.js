var express = require('express');
var router = express.Router();
var util_controller =  require('../controllers/util');
var util_controller =  require('../controllers/util');


router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.headers);
  //console.log(req.device);
  //Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36
  //Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
  //Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Mobile Safari/537.36
  res.redirect("/pre/preregister")
  // if (res.locals.ismoble){
  //   res.redirect("/mb")
  // }
  // else {
  //   //res.render('index', { title: 'Express' });
  //   res.redirect("/pc")
  // }
  
});

router.get('/ipInfo', function (req, res) {
  res.send(req.ipInfo + "," + request.connection.remoteAddress);
});

router.get('/get_count', util_controller.get_count);

module.exports = router;
