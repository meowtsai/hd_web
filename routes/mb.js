var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', user_controller.mb_preregister);



router.get('/preregister', function(req, res, next) {
    res.render('index', { title: 'YOU ARE USING MOBILE' });    
});

router.post('/post_preregister', function(req, res, next) {
    res.render('index', { title: 'YOU ARE USING MOBILE' });    
});

module.exports = router;