$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger').toggleClass('header__burger--active');
        $('.menu').toggleClass('menu--active');
        $('.menu__title').toggleClass('menu__title--active');
        $('.logo').toggleClass('logo--active');
        $('.header__mob-button').toggleClass('header__mob-button--active');
        $('.menu__print').toggleClass('menu__print--active');
    });  
});


//slick slider

$(document).ready(function(){
    $('.slider').slick({
        dots: false,
        infinite: false,
        slidesToShow: 2,
        autoplay: false,
        // appendArrows: $('.slider-nav'),
        prevArrow: $('.left-arrow-wrapper'),
        nextArrow: $('.right-arrow-wrapper'),
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '30px',
                slidesToShow: 1
              }
            }
          ]
    });
});


//wow

new WOW().init();