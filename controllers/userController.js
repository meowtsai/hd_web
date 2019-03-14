const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const moment  = require('moment');
const connection = require('../models/dbconnection'); 
const nodemailer = require("nodemailer");
const smtp_server = require('../config')['smtp_server'];
const util = require('./util');



exports.preregister = function(req,res,next){
    //console.log('called preregister');
    const gift_data = [
        {id:1,title:"伐木大師的饋贈", items:["【石幣】*50,000","【伐木斧 · 2级】*1 ","【海民耐吃肉乾】 *3"] },
        {id:2,title:"挖礦大師的饋贈", items:["【石幣】*60,000","【礦鎬 · 2级】*1 ","【海民耐吃果乾】*3 ","【小份活力肉腿】*1"] },
        {id:3,title:"割草大師的饋贈", items:["【石幣】*80,000 ","【鐮刀 · 2级】*1 ","【海民寵物口糧】*3 ","【芬里克之花】*2"] },
        {id:4,title:"剝皮大師的饋贈", items:["【石幣】*100,000 ","【剝皮刀 · 2級】*1 ","【海民燉肉】*6","【馴寵石】*2"] },
        {id:5,title:"馴寵大師的饋贈", items:["【石幣】*150,000 ","【還原石】*1 ","【普通藏寶圖碎片】*6","【鎧甲獸騎乘證 · 7日】"] },
    ];
    const title = "海島紀元事前登錄";
    const meta_keyword = "海島紀元";
    const meta_desc = "《海島紀元》採用了風格化的卡通渲染，人物設定突出搞怪風趣。在傳統角色扮演的基礎上，遊戲還將採集製作、島嶼建設、寵物馴養、元素互動等玩法融入其中。玩家可以砍樹、採礦、釣魚、種菜，建設管理屬於自己的小島，製作豐富的道具和美食，還可以在野外捕捉各具特色的寵物，帶著他們一起冒險。此外，遊戲中還加入了元素互動，增加了戰鬥的可玩性和策略性，玩家可以通過靈活掌控水、火、毒、風等元素間的相生相剋，改變戰局。"

    const user_registered = util.get_count();
    //const user_registered = 260000;
    const target_count = 250000;
    const percentage = parseInt((user_registered/target_count)*100);
    //console.log("percentage server ", percentage)
    
    page_options = {
        title,
        gift_data,
        meta_keyword,
        meta_desc,
        user_registered,
        percentage,
    };

    if (res.locals.ismoble)
    {
        res.render('event/preregister_mb', page_options);    
    }
    else {
        res.render('event/preregister', page_options);    
    }
    
    

}

exports.mb_preregister = function(req,res,next){
    console.log('called mbpreregister');
    res.render('mb/preregister', { title: '海島紀元預約登錄', keyword:'海島紀元' });

}



exports.post_preregister = [
    body('email_address').isEmail().normalizeEmail().withMessage('* Email格式不正確'),
    body('chk_agree').equals('true').withMessage('請同意資料條款及隱私權政策'),
    sanitizeBody('email_address').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        //console.log("------------" ,req.connection);   
        //console.log("-----threadId-------" ,connection.threadId);   
            
        if (!errors.isEmpty()) {
            //console.log("-----errors-------" ,errors.array());   
            return res.status(422).json({ errors: errors.array(),status:'failed' });
            //res.render('pc/preregister', { title: '海島紀元預約登錄', keyword:'海島紀元' ,errors: errors.array()});
        }
        else {
            //return res.status(200).json({ errors: {}, status:'success' });
            //create data 
            //var ip = request.connection.remoteAddress;
            var email = req.body.email_address;
            const ipInfo = req.ipInfo;
            var selQuery = connection.query('SELECT email,create_time  FROM event_preregister where event_id=? and email=?',[16, email], function (error, results, fields) {
                console.log("result=", results);
                //insert into event_preregisterset event_id=?,  email=?,ip=?,country=?
                if (results==undefined || results.length==0){
                    var register_data = {event_id:16,nick_name:ipInfo.city, email:email,ip:req.headers['x-forwarded-for'],country:ipInfo.country};
                    var query = connection.query('INSERT INTO event_preregister SET ?', register_data, function (error, xresults, fields) {
                        if (error) throw error;
                        //connection.end();
                        //console.log("results.insertId ", xresults.insertId );
                        /// EMAIL /////
                        if (process.env.NODE_ENV!='development') {
                            let transporter = nodemailer.createTransport(smtp_server);
                            const fs = require('fs');

                            let html_template = fs.readFileSync(__dirname + '/../public/template/mail.txt', "utf8");

                            let mailOptions = {
                                from: '"🌊 海島紀元遊戲營運團隊 🍖 " <no-reply@longeplay.com.tw>', // sender address
                                to: email, // list of receivers
                                subject: "海島紀元預註冊成功通知 ✔", // Subject line
                                text: html_template // html body
                              };
                            
                              // send mail with defined transport object
                              let info = transporter.sendMail(mailOptions)
                            
                              //console.log("Message sent: %s", info.messageId);
    
                              /// EMAIL /////
                        }
                        


                        return res.status(200).json({ errors: {}, status:'success',insid: xresults.insertId });
                    });
                    //console.log(query.sql); 
                }
                else {
                    //connection.end();
                    return res.status(200).json({ errors: {}, status:'success', registered: {email:results[0].email,create_time:moment(results[0].create_time).format('YYYY-MM-DD HH:mm:ss')}  });
                }
                
            });
            //console.log(selQuery.sql); 
        
        
        }
    }

        
];
