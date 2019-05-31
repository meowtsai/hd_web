$(function(){
/*jQuery(window).load(function(){  //load函数
       jQuery("#loading_bg ").hide(0);
		
    });*/
	      	
	
	
	//section1 swiper 
	
	var swiper_section1 = new Swiper ('#swiper_section1', {
    
	initialSlide:1,	
    loop: true, // 循环模式选项
    // 如果需要分页器
	lazy: true,	
    pagination: {
      el: '#swiper-pagination_section1',
	  clickable: true,
	  renderBullet: function (index, className) {
          return '<span class="' + className + '">' + video_menu[index] + '</span>';
        },
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '#swiper-button-next_section1',
      prevEl: '#swiper-button-prev_section1',
    },
    
  });  
   
	//section1 swiper 
	var swiper_section2 = new Swiper ('#swiper_section2', {
    loop: true, // 循环模式选项
	autoplay: {
    delay:3000,//秒切换一次
    },
	spaceBetween:100,
    // 如果需要分页器
	
    // 如果需要分页器
    pagination: {
      el: '#swiper-pagination_section2',
	  clickable: true,
      },
	
  });  
     
	//情報
	$(".mb_tab").champ({
				active_tab : "1"
			});
	
	
	//section2 swiper 
	var swiper_section3 = new Swiper ('#swiper_section3', {
    //direction: 'vertical', // 垂直切换选项
	initialSlide:2,
    loop: true, // 循环模式选项
	//autoplay: {
    //delay:1000,//秒切换一次
    //},	
	spaceBetween:30,
	slidesPerView:3,//swiper-slide寬高比例，否則會位移
	centeredSlides: true,
    pagination: {
      el: '#swiper-pagination_section3',
	  clickable: true,
      },	
  });  
  //section3 swiper
var swiper_section4 = new Swiper ('#swiper_section4', {
	initialSlide:2,	
	slidesPerView:3,		
    loop: true, 
	spaceBetween : 25,
     pagination: {
      el: '#swiper-pagination_section4',
	  clickable: true,
      },
    
    
  });  	
	//section4 
	var sct5_menu = ['採集資原', '寵物契約技', '部落戰','騎寵大師賽','角鬥聯賽','鉤索大作戰','魚王挑戰賽','灘頭陣線'];
	var sct5_num=['mb_sc5icon_1.png','mb_sc5icon_2.png','mb_sc5icon_3.gif','mb_sc5icon_4.gif','mb_sc5icon_5.gif','mb_sc5icon_6.gif','mb_sc5icon_7.gif','mb_sc5icon_8.gif'];
	var swiper_section5 = new Swiper ('#swiper_section5', {	
    loop: true, // 循环模式选项
	spaceBetween:-20,	
	autoplay: {
    delay:3000,//秒切换一次
    },	
	slidesPerView:3,//swiper-slide寬高比例，否則會位移
	centeredSlides: true,	
    // 如果需要分页器
    pagination: {
      el: '#swiper-pagination_section5',
	  clickable: true,
	  renderBullet: function (index, className) {
          return '<span class="' + className + '" style="background-image:url(img/'+sct5_num[index] +'"> '+
			    '<div class="sct5_icon_text">'+ sct5_menu[index] + '</div>'+
			   '</span>';
        },	
      },	
	    // 如果需要前进后退按钮
    navigation: {
      nextEl: '#swiper-button-next_section5',
      prevEl: '#swiper-button-prev_section5',
    },	
  });  	
   
	$('.slide-up').click(function(){
		 fullpage_api.moveTo(1);
	});
	
	
	
});