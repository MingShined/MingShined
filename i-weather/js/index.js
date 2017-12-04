/* JS Document 
use for:www.18183.com
version:1.0
Data:2017/12/04
Author: MingShined
*/


$(function() {


	var tips = new Swiper('#tips',{
		loop:true,
		slidesPerView:1,
		slidesPerGroup:1,
		loopFillGroupWithBlank:true,
		spaceBetween:10,
		navigation:{
			nextEl:'.swiper-next1',
			prevEl:'.swiper-prev1',
		},
		// pagination:{}
	})

    var future = new Swiper('#future', {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-next2',
            prevEl: '.swiper-prev2',
        },
    });


})