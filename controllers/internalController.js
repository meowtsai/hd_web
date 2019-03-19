const connection = require('../models/dbconnection'); 

// $summary = $this->db->query("Select DATE_FORMAT(create_time,'%Y-%m-%d') as dDate,count(id) as count from event_preregister
// where event_id={$event_id}
// group by DATE_FORMAT(create_time,'%Y-%m-%d') order by DATE_FORMAT(create_time,'%Y-%m-%d') desc, count(id) desc");

// $summary_country = $this->db->query("Select country,count(id) as count from event_preregister where event_id={$event_id} group by country order by count(id) desc");



exports.report = async function(req,res,next){

    if (req.headers['x-forwarded-for']!=='61.220.44.200' && req.headers['x-forwarded-for']!== '10.0.2.2'){
        //res.status.json('')
        res.status(200).json({ msg:"not a valid request" } );

    }
    let dD = await dailyData()
    let rD = await regionData()
    
    //console.log( "first line", dataList )
    page_options = {
        title: "海島紀元預註冊報表",
        daily_data:dD,
        region_data:rD,
    };
    //console.log( "page_options", page_options )
    res.render('cake/report', page_options); 


}

var dailyData = async function ( ) {
    let sql = `Select DATE_FORMAT(create_time,'%Y-%m-%d') as dDate,count(id) as count 
    from event_preregister
    where event_id=?
    group by DATE_FORMAT(create_time,'%Y-%m-%d') 
    order by DATE_FORMAT(create_time,'%Y-%m-%d') desc, count(id) desc`
    let values = [16];
    let dataList = await query( sql, values )
    return dataList
  }
  var regionData = async function ( ) {
    let sql = `Select country,nick_name,count(id) as count from event_preregister where event_id=? group by country,nick_name order by count(id) desc`
    let values = [16];
    let dataList = await query( sql, values )
    return dataList
  }


let  query = (sql, values )  => {
    return new Promise(( resolve, reject ) => {
        connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            //connection.release()
        })
    })
  }