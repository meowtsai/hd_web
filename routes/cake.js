var express = require('express');
var router = express.Router();
var internal_controller = require('../controllers/internalController');

router.get('/report', internal_controller.report);


module.exports = router;