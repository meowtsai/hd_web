const { query } = require("./dbconnection");
const isEmpty = require("../utils/is-empty");
let sql, values, datarows;
const BulletinModel = {
  get_row: async id => {
    sql = "select * from bulletins where id=?";
    values = [id];
    datarows = await query(sql, values);
    return datarows[0];
  },

  get_bulletin: async (game_id, id) => {
    sql =
      "select * from bulletins where game_id=? and id=? and priority >0 and now() between start_time and end_time";
    values = [game_id, id];
    datarows = await query(sql, values);
    return datarows;
  },
  get_list: async (game_id, type, limit, offset) => {
    sql =
      "select id, title,type,create_time, start_time,(case when SUBSTRING(MID(content,instr(content,'src=')+5,84),1,4)='http' then  MID(content,instr(content,'src=')+5,84) else null end) as hero_image,MID(REPLACE(content,' ',''),1,150) as preview_content from bulletins where game_id=? and priority >0 and now() between start_time and end_time ";
    if (!isEmpty(type)) {
      sql += " and type=?";
    } else {
      type = 99;
      sql += " and type !=?";
    }

    sql += " order by priority desc, start_time desc ";
    if (!isEmpty(offset)) {
      sql += " limit ? offset ?";
    } else {
      sql += " limit ?";
    }

    values = [game_id, type, limit, offset];
    datarows = await query(sql, values);
    console.log(sql, values);
    return datarows;
  },
  get_count: async (game_id, type) => {
    sql =
      "select count(id) as cnt from bulletins where game_id=? and priority >0 and now() between start_time and end_time ";
    if (!isEmpty(type)) {
      sql += " and type=?";
    } else {
      type = 99;
      sql += " and type !=?";
    }

    sql += " order by priority desc, start_time desc";
    values = [game_id, type];
    datarows = await query(sql, values);
    return datarows[0].cnt;
  }
};

module.exports = BulletinModel;
