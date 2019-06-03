$(function() {
  $.each($(".tab_content"), function(index, tc) {
    //console.log(i, val);
    tc.style.display = "none";
  });
  var q = window.location.search.replace("?", "").split("&");
  let type = 0;
  let page = 1;
  for (let index = 0; index < q.length; index++) {
    const element = q[index];
    if (element.indexOf("type") > -1) {
      type = element.split("=")[1];
    }
    if (element.indexOf("page") > -1) {
      page = element.split("=")[1];
    }
  }

  const active_setting = {
    active_tab: Number.parseInt(type) + 1
  };
  //console.log(active_setting);

  $(".first_tab").champ(active_setting);

  $("#back-to-top").on("click", function(e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0
      },
      700
    );
  });
});
