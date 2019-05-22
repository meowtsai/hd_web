const { db2, query } = require("../models/dbconnection");

// $summary = $this->db->query("Select DATE_FORMAT(create_time,'%Y-%m-%d') as dDate,count(id) as count from event_preregister
// where event_id={$event_id}
// group by DATE_FORMAT(create_time,'%Y-%m-%d') order by DATE_FORMAT(create_time,'%Y-%m-%d') desc, count(id) desc");

// $summary_country = $this->db->query("Select country,count(id) as count from event_preregister where event_id={$event_id} group by country order by count(id) desc");

exports.report = async function(req, res, next) {
  //console.log("req.headers", req.headers);

  if (
    req.headers["x-forwarded-for"] !== "61.220.44.200" &&
    req.headers["x-forwarded-for"] !== "10.0.2.2" &&
    req.headers["host"] !== "127.0.0.1:4567"
  ) {
    //res.status.json('')
    res.status(200).json({ msg: "not a valid request" });
    return;
  }
  let dD = await dailyData();
  let rD = await regionData();

  //console.log( "first line", dataList )
  page_options = {
    title: "海島紀元預註冊報表",
    daily_data: dD,
    region_data: rD
  };
  //console.log( "page_options", page_options )
  res.render("cake/report", page_options);
};

var dailyData = async function() {
  let sql = `Select DATE_FORMAT(create_time,'%Y-%m-%d') as dDate,count(id) as count 
    from event_preregister
    where event_id=?
    group by DATE_FORMAT(create_time,'%Y-%m-%d') 
    order by DATE_FORMAT(create_time,'%Y-%m-%d') desc, count(id) desc`;
  let values = [16];
  let dataList = await query(sql, values);
  return dataList;
};
var regionData = async function() {
  let sql = `Select country,count(id) as count from event_preregister where event_id=? group by country order by count(id) desc`;
  let values = [16];
  let dataList = await query(sql, values);
  return dataList;
};
