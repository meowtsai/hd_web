var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', user_controller.mb_preregister);


router.get('/preregister', user_controller.preregister);
router.post('/post_preregister', user_controller.post_preregister);


router.get('/preregister_mb9999', function(req, res, next) {

    const gift_data = [
        {id:1,title:"伐木大師的饋贈", items:["【石幣】*50,000","【伐木斧 · 2级】*1 ","【海民耐吃肉乾】 *3"] },
        {id:2,title:"挖礦大師的饋贈", items:["【石幣】*60,000","【礦鎬 · 2级】*1 ","【海民耐吃果乾】*3 ","【小份活力肉腿】*1"] },
        {id:3,title:"割草大師的饋贈", items:["【石幣】*80,000 ","【鐮刀 · 2级】*1 ","【海民寵物口糧】*3 ","【芬里克之花】*2"] },
        {id:4,title:"剝皮大師的饋贈", items:["【石幣】*100,000 ","【剝皮刀 · 2級】*1 ","【海民燉肉】*6","【馴寵石】*2"] },
        {id:5,title:"馴寵大師的饋贈", items:["【石幣】*150,000 ","【還原石】*1 ","【普通藏寶圖碎片】*6","【鎧甲獸騎乘證 · 7日】"] },
    ];
    res.render('event/preregister_mb', { title: '海島紀元事前登錄', gift_data:gift_data,meta_keyword:"海島紀元",meta_desc:"《海島紀元》採用了風格化的卡通渲染，人物設定突出搞怪風趣。在傳統角色扮演的基礎上，遊戲還將採集製作、島嶼建設、寵物馴養、元素互動等玩法融入其中。玩家可以砍樹、採礦、釣魚、種菜，建設管理屬於自己的小島，製作豐富的道具和美食，還可以在野外捕捉各具特色的寵物，帶著他們一起冒險。此外，遊戲中還加入了元素互動，增加了戰鬥的可玩性和策略性，玩家可以通過靈活掌控水、火、毒、風等元素間的相生相剋，改變戰局。" });    
});


router.get('/preregister', function(req, res, next) {
    res.render('event/preregister', { title: 'YOU ARE NOT USING MOBILE' });    
});


module.exports = router;