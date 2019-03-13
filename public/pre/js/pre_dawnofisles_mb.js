$(function(){

				$("#pre_btn").click(function(){
					$("#pre_outer_layer").show();
				});
				$("#pre_close").click(function(){
					$("#pre_outer_layer").hide();
				});
			   
			
               $(".arrive_on").click(function(){
					$(this).next().show();	
				});
			     $(".pre_arrive_gift_detail_close").click(function(){
					$(".arrive_gift_detail").hide();	
				});	
			
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