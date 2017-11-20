//section1
var swiper1_Big = new Swiper('.swiper1-big', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper1_lit = new Swiper('.swiper1-lit', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
});
swiper1_Big.controller.control = swiper1_lit;
swiper1_lit.controller.control = swiper1_Big;

//section2
var swiper2_Big = new Swiper('.swiper2-big', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper2_lit = new Swiper('.swiper2-lit', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
});
swiper2_Big.controller.control = swiper2_lit;
swiper2_lit.controller.control = swiper2_Big;

$('.swiper2-lit .swiper-slide').removeClass('on').parents().find('.swiper-slide-active').addClass('on');


//section3
var swiper3_Big = new Swiper('.swiper3-big', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper3_lit = new Swiper('.swiper3-lit', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
});
swiper3_Big.controller.control = swiper3_lit;
swiper3_lit.controller.control = swiper3_Big;

//section4
var swiper4_Big = new Swiper('.swiper4-big', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper4_lit = new Swiper('.swiper4-lit', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
});
swiper4_Big.controller.control = swiper4_lit;
swiper4_lit.controller.control = swiper4_Big;

//section5
var swiper5_Big = new Swiper('.swiper5-big', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper5_lit = new Swiper('.swiper5-lit', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
});
swiper5_Big.controller.control = swiper5_lit;
swiper5_lit.controller.control = swiper5_Big;