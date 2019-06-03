const moment = require("moment");
const Bulletins = require("../models/BulletinModel");
const config = require("../config");
exports.home = async function(req, res, next) {
  const ip_ok = config.insider_ip.filter(
    ip =>
      ip === req.headers["x-forwarded-for"] ||
      ip === req.connection.remoteAddress
  );
  //console.log("req.hostname", req.hostname);
  if (ip_ok.length < 1 && req.hostname !== "127.0.0.1") {
    //inoffice
    res.redirect("/event/preregister");
    return;
  }

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
    social_media: config.social_media,
    headline: config.headline,
    GPlink,
    news_group: [news, news_1, news_2, news_3],
    moment
  };

  if (res.locals.ismoble) {
    res.render("index/home_mb", page_options);
  } else {
    res.render("index/home", page_options);
  }
};
