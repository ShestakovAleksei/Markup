$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger').toggleClass('header__burger--active');
        $('.header__menu').toggleClass('header__menu--active');
        $('.header__menu-title').toggleClass('header__menu-title--active');
        $('.header__logo').toggleClass('header__logo--active');
        $('.header__mob-button').toggleClass('header__mob-button--active');
        $('.header__menu-print').toggleClass('header__menu-print--active');
    });
});