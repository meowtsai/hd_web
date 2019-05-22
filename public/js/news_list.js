$(function() {
  $.each($(".tab_content"), function(index, tc) {
    //console.log(i, val);
    tc.style.display = "none";
  });

  $(".first_tab").champ({
    active_tab: "1"
  });
});
