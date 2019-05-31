//Bulletin
const moment = require("moment");
const striptags = require("striptags");
const Bulletins = require("../models/BulletinModel");
const config = require("../config");

exports.list = async function(req, res, next) {
  const game_id = config.game_id;

  //let day_x = parseInt((date_now - begin_date)/ (1000 * 60 * 60 * 24));
  //console.log("starting", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const news = await Bulletins.get_list(game_id, "", 16, 0);
  const news_1 = await Bulletins.get_list(game_id, 1, 16, 0);
  const news_2 = await Bulletins.get_list(game_id, 2, 20, 0);
  const news_3 = await Bulletins.get_list(game_id, 3, 16, 0);
  //console.log("ending", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  //console.log(news);

  const GPlink =
    "https://play.google.com/store/apps/details?id=com.netease.hdjytw";

  page_options = {
    title: config.title + "- 新聞列表",
    meta_keyword: config.meta_keyword,
    meta_desc: config.meta_desc,
    social_media: config.social_media,
    news_type: config.news_type,
    GPlink,
    news_group: [news, news_1, news_2, news_3],
    moment,
    striptags
  };

  if (res.locals.ismoble) {
    res.render("news/list_mb", page_options);
  } else {
    res.render("news/list", page_options);
  }
};

exports.detail = async function(req, res, next) {
  const news_id = req.params.id;
  const game_id = config.game_id;

  //let day_x = parseInt((date_now - begin_date)/ (1000 * 60 * 60 * 24));
  //console.log("starting", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const news_item = await Bulletins.get_row(news_id);
  //console.log("ending", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  //console.log(news_item);

  const GPlink =
    "https://play.google.com/store/apps/details?id=com.netease.hdjytw";

  page_options = {
    title: config.title + " - " + news_item.title,
    meta_keyword: config.meta_keyword,
    meta_desc: config.meta_desc,
    news_type: config.news_type,
    social_media: config.social_media,
    GPlink,
    news_item,
    moment,
    striptags
  };

  if (news_item === undefined || news_item === null) {
    res.redirect("/news_mv");
  } else {
    if (res.locals.ismoble) {
      res.render("news/detail_mb", page_options);
    } else {
      res.render("news/detail", page_options);
    }
  }
};
