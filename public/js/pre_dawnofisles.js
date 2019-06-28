$(function() {
  /*jQuery(window).load(function(){  //load函数
       jQuery("#loading_bg ").hide(0);
		
    });*/
  var left_nav = $(".left_nav");
  if ($(window).width() < 1679) {
    left_nav.css("left", "-350px");
    $(".gugusay").fadeIn();
  }

  var gugusay = ["......咦?", "冒險順利!", "快出發!!!", "等你回來!"];
  var gugusay_num = 0;

  $(".slide_left_gugu").click(function() {
    //$(".left_nav").toggleClass("left_nav_ani");
    if (left_nav.css("left") === "0px") {
      left_nav.css("left", "-350px");
      $(".gugusay").fadeIn();
      $(".gugusay").text(gugusay[gugusay_num]);
      if (gugusay_num === 3) {
        gugusay_num = 0;
      } else {
        gugusay_num = gugusay_num + 1;
      }
    } else {
      left_nav.css("left", "0px");
      $(".gugusay").fadeOut();
    }
  });
  function eyes_loop() {
    for (var i = 0; i < 100; i++) {
      $(".gugueye")
        .show(0)
        .delay(Math.random() * 500)
        .hide(0)
        .delay(Math.random() * 5000);
    }
  }
  eyes_loop();

  //section1 swiper
  var video_menu = ["樂趣", "晝夜/天氣", "生活"];
  var swiper_section1 = new Swiper("#swiper_section1", {
    initialSlide: 1,
    effect: "fade",
    loop: true, // 循环模式选项
    // 如果需要分页器
    lazy: true,
    pagination: {
      el: "#swiper-pagination_section1",
      clickable: true,
      renderBullet: function(index, className) {
        return (
          '<span class="' + className + '">' + video_menu[index] + "</span>"
        );
      }
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: "#swiper-button-next_section1",
      prevEl: "#swiper-button-prev_section1"
    }
  });

  //section2 swiper
  var news_menu_text = [
    "不僅僅是島嶼建造和MMO冒險 《海島紀元》iOS版本上線",
    "《海島紀元》開啟全新夏日限定活動「南島夏日」",
    "超不正經の島嶼冒險遊戲《海島紀元》即將推出"
  ];
  var swiper_section2_slidernum_onslide = 0; //swiper當前滑動數字
  var swiper_section2_slidernum = $("#swiper_section2 .swiper-slide");
  var swiper_section2_txt = $(".section2_swiper_newsphoto_bottomnav_txt");
  var swiper_section2 = new Swiper("#swiper_section2", {
    //direction: 'vertical', // 垂直切换选项
    autoplay: {
      delay: 5000 //秒切换一次
    },
    // 如果需要分页器
    pagination: {
      el: "#swiper-pagination_section2",
      clickable: true
    },
    on: {
      slideChangeTransitionStart: function(swiper) {
        swiper_section2_txt.text(news_menu_text[swiper_section2.activeIndex]);
      }
    }
  });

  //情報
  $(".first_tab").champ({
    active_tab: "1"
  });

  //section3 swiper
  var swiper_section3 = new Swiper("#swiper_section3", {
    //direction: 'vertical', // 垂直切换选项
    effect: "coverflow",
    initialSlide: 2,
    loop: true, // 循环模式选项
    //autoplay: {
    //delay:1000,//秒切换一次
    //},
    slidesPerView: 1.42, //swiper-slide寬高比例，否則會位移
    centeredSlides: true,
    // 如果需要分页器
    coverflowEffect: {
      rotate: 0,
      stretch: 100,
      depth: 550,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: "#swiper-pagination_section3",
      clickable: true
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: "#swiper-button-next_section3",
      prevEl: "#swiper-button-prev_section3"
    }
  });
  //section4 swiper
  var swiper_section4 = new Swiper("#swiper_section4", {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 25,
    navigation: {
      nextEl: "#swiper-button-next_section4",
      prevEl: "#swiper-button-prev_section4"
    }
  });

  //section6
  $(".second_tab").champ({
    active_tab: "1"
  });

  //go_top _right
  if ($("#go_top_right").length) {
    var scrollTrigger = 500, // px
      backToTop = function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#go_top_right").show();
        } else {
          $("#go_top_right").hide();
        }
      };
    backToTop();
    $(window).on("scroll", function() {
      backToTop();
      alert($("#go_top_right").length);
    });
  }

  $(".go_top_right").click(function() {
    fullpage_api.moveTo(1);
  });
});
