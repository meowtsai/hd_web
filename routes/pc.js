var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/preregister', user_controller.preregister);
//router.post('/search', book_controller.search_post);



router.post('/post_preregister', user_controller.post_preregister);

module.exports = router;