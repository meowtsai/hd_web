const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const moment  = require('moment');
//const axios = require('axios');
const connection = require('../models/dbconnection'); 
const nodemailer = require("nodemailer");
const smtp_server = require('../config')['smtp_server'];
const fs = require('fs');

//var async = require('async');


exports.preregister = function(req,res,next){
    console.log('called preregister');
    res.render('pc/preregister', { title: '海島紀元預約登錄', keyword:'海島紀元' });

}

exports.mb_preregister = function(req,res,next){
    console.log('called mbpreregister');
    res.render('mb/preregister', { title: '海島紀元預約登錄', keyword:'海島紀元' });

}



exports.post_preregister = [
    body('email_address').isEmail().normalizeEmail(),
    body('chk_agree').equals('true').withMessage('請同意資料條款及隱私權政策'),
    sanitizeBody('email_address').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        //console.log("------------" ,req.connection);   
        //console.log("-----threadId-------" ,connection.threadId);   
            
        if (!errors.isEmpty()) {
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
                    var register_data = {event_id:16,nick_name:ipInfo.city, email:email,ip:req.connection.remoteAddress,country:ipInfo.country};
                    var query = connection.query('INSERT INTO event_preregister SET ?', register_data, function (error, xresults, fields) {
                        if (error) throw error;
                        //connection.end();
                        console.log("results.insertId ", xresults.insertId );
                        /// EMAIL /////
                        if (process.env.NODE_ENV!='development') {
                            let transporter = nodemailer.createTransport(smtp_server);
                            const fs = require('fs');

                            let html_template = fs.readFileSync(__dirname + '/../public/template/mail.html', "utf8");

                            html_template = html_template.replace('|CONTENT_HERE|',`<h1>事前登陸預約</h1> 親愛的準搗民, <br />
                            感謝您的參與。 <br />
                            您的郵件地址：${email} <br />
                            在 ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} 已經收入我們的拓荒者登記簿， <br />
                            請耐心等待我們完成基礎建設。  <br />
                            期待與您共同開創海島新紀元！  <br />` );

                            let mailOptions = {
                                from: '"🌊 海島紀元遊戲營運團隊 🍖 " <no-reply@longeplay.com.tw>', // sender address
                                to: email, // list of receivers
                                subject: "海島紀元預註冊成功通知 ✔", // Subject line
                                html: html_template // html body
                              };
                            
                              // send mail with defined transport object
                              let info = transporter.sendMail(mailOptions)
                            
                              console.log("Message sent: %s", info.messageId);
    
                              /// EMAIL /////
                        }
                        


                        return res.status(200).json({ errors: {}, status:'success',insid: xresults.insertId });
                    });
                    console.log(query.sql); 
                }
                else {
                    //connection.end();
                    return res.status(200).json({ errors: {}, status:'success', registered: {email:results[0].email,create_time:moment(results[0].create_time).format('YYYY-MM-DD HH:mm:ss')}  });
                }
                
            });
            console.log(selQuery.sql); 
        
        
        }
    }

        
];
