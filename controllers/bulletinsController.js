//Bulletin
const moment = require("moment");
const striptags = require("striptags");
const Bulletins = require("../models/BulletinModel");
const config = require("../config");
const game_id = config.game_id;
const PAGE_SIZE = 6;
let page_options = {
  title: config.title + "- 新聞列表",
  meta_keyword: config.meta_keyword,
  meta_desc: config.meta_desc,
  social_media: config.social_media,
  news_type: config.news_type,
  moment,
  striptags
};
exports.list = async function(req, res, next) {
  let type = isNaN(req.query.type) ? 0 : req.query.type;
  let page = isNaN(req.query.page) ? 1 : req.query.page;

  const news = await Bulletins.get_list(
    game_id,
    "",
    PAGE_SIZE,
    type === "0" ? (page - 1) * 6 : 0
  );
  const news_page = Math.ceil(
    (await Bulletins.get_count(game_id, "")) / PAGE_SIZE
  );
  const news_1 = await Bulletins.get_list(
    game_id,
    1,
    PAGE_SIZE,
    type === "1" ? (page - 1) * 6 : 0
  );
  const news_1_page = Math.ceil(
    (await Bulletins.get_count(game_id, 1)) / PAGE_SIZE
  );
  const news_2 = await Bulletins.get_list(
    game_id,
    2,
    PAGE_SIZE,
    type === "2" ? (page - 1) * 6 : 0
  );
  const news_2_page = Math.ceil(
    (await Bulletins.get_count(game_id, 2)) / PAGE_SIZE
  );
  const news_3 = await Bulletins.get_list(
    game_id,
    3,
    PAGE_SIZE,
    type === "3" ? (page - 1) * 6 : 0
  );
  const news_3_page = Math.ceil(
    (await Bulletins.get_count(game_id, 3)) / PAGE_SIZE
  );

  page_options = {
    ...page_options,
    news_group: {
      0: { news, news_page },
      1: { news: news_1, news_page: news_1_page },
      2: { news: news_2, news_page: news_2_page },
      3: { news: news_3, news_page: news_3_page }
    },
    cur_type: type,
    cur_page: page
  };
  //console.log(page_options.news_group);
  if (res.locals.ismoble) {
    res.render("news/list_mb", page_options);
  } else {
    res.render("news/list", page_options);
  }
};

exports.detail = async function(req, res, next) {
  const news_id = req.params.id;

  const news_item = await Bulletins.get_row(news_id);
  page_options = {
    ...page_options,
    news_item
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

exports.get_news = async (req, res, next) => {
  //news/get_news?newsType=0&page=1
  const newsType = req.query.newsType === "0" ? "" : req.query.newsType;
  const news = await Bulletins.get_list(
    game_id,
    newsType,
    PAGE_SIZE,
    (req.query.page - 1) * PAGE_SIZE
  );

  return res.status(200).json({ status: 1, msg: news });
};
