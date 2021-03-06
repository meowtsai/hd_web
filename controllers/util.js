let config = require("../config");

exports.get_count = function(req, res, next) {
  //return res.status(200).json({count:prereg_count() });
  return 261081;
};

function prereg_count() {
  const base_num = config.daily_base;
  const begin_date = new Date(config.begin_date);
  //const begin_date = new Date("2019-03-29 00:00:00");
  const date_dist = config.date_dist;
  const hh_dist = config.hh_dist;
  const date_now = new Date();
  let day_x = parseInt((date_now - begin_date) / (1000 * 60 * 60 * 24));
  const date_index = date_dist[day_x] ? date_dist[day_x] : 0.0085;
  if (date_now - begin_date < 0) {
    return 0;
  }
  //console.log("date_now - begin_date:",date_now - begin_date )
  //console.log("目前天數:",day_x )

  //var rtn_number = 0;
  //var rtn_number = 99895;
  var rtn_number = 117300;
  for (let index = 0; index < day_x; index++) {
    rtn_number += base_num * date_dist[index] * 200;
    //** */rtn_number += base_num * 0.0085 * 200;
    //console.log("目前人數:",parseInt(rtn_number) )
  }

  let curr_hours = date_now.getHours();
  let curr_mins = date_now.getMinutes();
  //console.log("目前時間:",curr_hours )
  //console.log("目前分:",curr_mins )

  let this_hour = base_num * date_index * hh_dist[curr_hours] * 200;
  //** */let this_hour = base_num * 0.0085 * hh_dist[curr_hours] * 200;
  //console.log("這個小時的人數:",this_hour )
  for (let h = 0; h < curr_hours; h++) {
    rtn_number += base_num * date_index * 200 * hh_dist[h];
    //** */rtn_number += base_num * 0.0085 * 200 * hh_dist[h];
  }

  rtn_number += (10 * this_hour) / (curr_mins > 50 ? 10 : 60 - curr_mins);

  //console.log("目前人數:",parseInt(rtn_number) )
  return parseInt(rtn_number);
  //return day_x;
}

//console.log(prereg_count());
