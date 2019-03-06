$(function(){
    $("#pre_outer_layer").show();

    fetch("/get_count", {
        method: 'GET', // or 'PUT'
        headers: new Headers({
            'Content-Type': 'application/json'
        })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {    
            console.log("get_count", response);
            var target_count = 250000;
            var cnt = response.count;
            document.getElementById("arrive_number").children[0].innerText=cnt;
            //width多13px
            var percentage = parseInt((cnt/target_count)*100);
            console.log("percentage",percentage);
            document.getElementById("timleline_arrivepercent").style.width = percentage*13 + 'px';

            //<div id="arrive1" class="ani" swiper-animate-effect="bounceIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s" style="display: none;"></div>
            //#arrive1.ani(swiper-animate-effect="bounceIn", swiper-animate-duration="0.5s", swiper-animate-delay="0.3s", style="display: none;")
            var divTarget = document.createElement("div"); 
            var attObj = {"id":"arrive1","class":"ani","swiper-animate-effect":"bounceIn","swiper-animate-duration":"0.5s","swiper-animate-delay":"0.3s","style":"display: inline;"};

            for (var key in attObj) {
                if (attObj.hasOwnProperty(key)) {
                    //console.log(key + " -> " + attObj[key]);
                    var att = document.createAttribute(key);
                    att.value = attObj[key];
                    divTarget.setAttributeNode(att); 
                }
                
            }
            
            if (cnt >= 50000 && cnt < 100000){
                //document.getElementById("arrive1").style.display='inline';
                divTarget.id="arrive1";
            }
            else if (cnt >= 100000 && cnt < 150000){
                //console.log('hit!');
                //swiper-animate-style-cache
                divTarget.id="arrive2";
            }
            else if (cnt >= 150000 && cnt < 200000){
                divTarget.id="arrive3";
            }
            else if (cnt >= 200000 && cnt < 250000){
                divTarget.id="arrive4";
            }
            else if (cnt >= 250000){
                divTarget.id="arrive5";
            }
            
            document.getElementById("pre_arrive_content2").appendChild(divTarget);

            
        });


    

	if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
     // MSIE
		$(".video_bg").hide();
    }
	$("#pre_btn").click(function(){
		$("#pre_outer_layer").show();
	});
	$("#pre_close").click(function(){
		$("#pre_outer_layer").hide();
	});

	
	//slidedown

	/*
	
	if ($('#slide-down').length) {
    var scrollTrigger =600, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#slide-down').fadeOut(300);
            } else {
                $('#slide-down').fadeIn(300);
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });

}	*/
	
	
	
	
	
	
});