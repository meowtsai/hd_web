function prereg_count(){
    const begin_date = new Date('2019-03-06');
    const end_date ='2019-04-20';
    const date_now = new Date();
    const target_number = 256182;
    const hh_dist =[0.043069426,0.029479392,0.020282096,0.011668211,0.007275473,0.007652974,0.01228594,0.016850269,0.024091424,0.032499399,0.038470778,0.045506023,0.043618518,0.044751021,0.046535571,0.078108377,0.063454477,0.062287656,0.060743334,0.061978791,0.062939703,0.062424929,0.064106524,0.059919695];
    console.log("date_now", date_now);
    console.log("begin_date", begin_date);
    let day_x = parseInt((date_now - begin_date)/ (1000 * 60 * 60 * 24));
    let rtn_number = 0;
    let curr_hours = date_now.getHours();
    for (let index = 0; index <= day_x; index++) {
        //rtn_number += 256182 * 0.001;
        for (let h = 0; h < curr_hours; h++) {
            rtn_number += target_number * 0.01 * hh_dist[h];
            
        }
    }
    return  rtn_number;
    //return day_x;

}


let x = prereg_count();
console.log(x);