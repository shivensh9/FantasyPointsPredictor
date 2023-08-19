$(document).ready(function () {

  // $(window).scroll(function () {
  //   var a = $(this).scrollTop();
  //   if (a > 100) {
  //     $('header').addClass('header-fixed');
  //   }
  //   else {
  //     $('header').removeClass('header-fixed');
  //   }
  // });

  $(".btn-box").click(function(){
    $(this).toggleClass("active");
  });

});
