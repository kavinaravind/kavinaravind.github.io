$(document).ready(function(){
      $('.carousel').carousel({
      	padding: 15,
      	dist: 0,
      	full_width: true
      });
      autoplay()
});

function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 3000);
}

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space