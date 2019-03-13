$(function(){
    var myFullpage = new fullpage('#fullpage', {
        anchors: ['firstPage', 'secondPage', '3rdPage'],
       // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        navigation: true,
        navigationPosition: 'right',
		showActiveTooltip: true,
        navigationTooltips: ['首頁', '登錄獎勵', '遊戲特色'],
		scrollingSpeed: 500,
		afterLoad: function(origin, destination, direction){
            //section 2
            if(destination.index == 1){
                document.querySelector('#section1').querySelector('.ani1').style.opacity =1;
				document.querySelector('#section1').querySelector('.ani2').style.opacity =1;
				document.querySelector('#section1').querySelector('.ani3').style.opacity =1;
				document.querySelector('#section1').querySelector('.ani4').style.opacity =1;
				document.querySelector('#section1').querySelector('.ani5').style.opacity =1;
            }

            //back to original state
            else if(origin && origin.index == 1){
                document.querySelector('#section1').querySelector('.ani1').style.opacity =0;
				document.querySelector('#section1').querySelector('.ani2').style.opacity =0;
				document.querySelector('#section1').querySelector('.ani3').style.opacity =0;
				document.querySelector('#section1').querySelector('.ani4').style.opacity =0;
				document.querySelector('#section1').querySelector('.ani5').style.opacity =0;
            
            }
            //section 3 is using the state classes to fire the animation
            //see the CSS code above!
        }
    }); 	
	
    
	$("#pre_btn").click(function(){
		$("#pre_outer_layer").show();
	});
	$("#pre_close").click(function(){
		$("#pre_outer_layer").hide();
	});
    
	

//	document.querySelector('.scrollable-content').addEventListener('mousewheel', function(e){
//    e.stopPropagation();
//    });	
	
});

function submitData(){
    event.preventDefault();
    var url = 'post_preregister';
    var email_address_input = document.getElementById('email_address');
    var chk_agree_input = document.getElementById('chk_agree');
    var data = {email_address: email_address_input.value, chk_agree: chk_agree_input.checked};
    console.log(data);

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        
        if (response.status=='success'){
            console.log('Success:', response.status);
            //document.getElementById('pre_form').style.display='none';
            
            document.getElementById('pre_form').innerHTML = "<div class='success_msg'>" 
                + "親愛的準海民, <br/>感謝您的參與。<br /> 您的郵件地址："
                + data.email_address 
                + ((response.registered?"<br />在<font color='red'>" + response.registered.create_time +"</font>":"" )) +'已經收入我們的拓荒者登記簿，<br />請耐心等待我們完成基礎建設。 <br />'
                + ' 期待與您共同開創海島新紀元！ <br />'
                + '<input class="btnReset" type=button value="我知道了" onclick="javascript:location.reload();" /></div>';
        } else {
            console.log(response.errors);
            if (response.errors) {
                    response.errors.forEach((error)=>{
                        console.log(error.param);
                        var elem = document.getElementById(error.param);
                        elem.classList.add("is-invalid");
                        var feedbackDiv = document.createElement("div");
                        feedbackDiv.innerHTML=error.msg;
                        feedbackDiv.classList.add('invalid-feedback');
                        elem.parentNode.insertBefore(feedbackDiv,elem.nextSibling);
                    });
            }
        }
        
    });


};