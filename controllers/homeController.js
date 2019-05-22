const moment = require("moment");
const Bulletins = require("../models/BulletinModel");
const config = require("../config");
exports.home = async function(req, res, next) {
  const game_id = config.game_id;

  //let day_x = parseInt((date_now - begin_date)/ (1000 * 60 * 60 * 24));
  //console.log("starting", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const news = await Bulletins.get_list(game_id, "", 5, 0);
  const news_1 = await Bulletins.get_list(game_id, 1, 5, 0);
  const news_2 = await Bulletins.get_list(game_id, 2, 5, 0);
  const news_3 = await Bulletins.get_list(game_id, 3, 5, 0);
  //console.log("ending", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  //console.log(news);

  const GPlink =
    "https://play.google.com/store/apps/details?id=com.netease.hdjytw";

  page_options = {
    title: config.title,
    meta_keyword: config.meta_keyword,
    meta_desc: config.meta_desc,
    GPlink,
    news_group: [news, news_1, news_2, news_3],
    moment
  };
  res.render("index/home", page_options);
};
