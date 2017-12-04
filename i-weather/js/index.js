/* JS Document 
use for:www.18183.com
version:1.0
Data:2017/12/04
Author: MingShined
*/


$(function() {


    //获取动态小时、分钟
    var timeElem = [$('.hour'), $('.minute')];

    getTimeVal(10000);

    function getTimeVal(t) {
        var time = new Date();
        var hour = '';
        var minute = '';
        var timeVal = [];
        if (time.getMinutes() < 10) {
        	minute = '0' + time.getMinutes();
        }else {
        	minute = time.getMinutes();
        }
        if (time.getHours() > 12) {
            $('.timeSign').text('PM');
            hour = time.getHours();
        } else {
            $('.timeSign').text('AM');
            if (time.getHours() < 10) {
                hour = '0' + time.getHours();
            }
        }
        timeVal = [hour, minute];
        for (var i = 0; i < timeVal.length; i++) {
            showTimeVal(timeElem[i], timeVal[i]);
        }
        setTimeout(function() {
            getTimeVal(t);
        }, t)
    }

    function showTimeVal(elem, val) {
        elem.text(val);
    }

    //提醒事项滑屏
    var tips = new Swiper('#tips', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-next1',
            prevEl: '.swiper-prev1',
        },
    })

    //未来五天天气滑屏
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

    //ajax获取数据
    //获取IP
    $.ajax({
            url: 'https://weixin.jirengu.com/weather/ip',
            type: 'get',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data);
            var $curIp = data.data;
            //根据IP、经纬度、城市名、获取城市ID
            $.ajax({
                    url: 'https://weixin.jirengu.com/weather/cityid?location=' + $curIp,
                    type: 'get',
                    dataType: 'json',
                })
                .done(function(data) {
                    console.log(data);
                    var $cityId = data.results[0].id;
                    //根据城市ID获取当天天气
                    $.ajax({
                            url: 'https://weixin.jirengu.com/weather/now?cityid=' + $cityId,
                            type: 'get',
                            dataType: 'json',
                        })
                        .done(function(data) {
                            console.log(data)
                            var $weather = data.weather[0];
                            var $date = $weather.last_update.substring(0, 10).replace(/-/g, "/");
                            $('.date').text($date);
                        })
                        .fail(function() {
                            console.log("error");
                        })

                })
                .fail(function() {
                    console.log("error");
                })
        })
        .fail(function() {
            console.log("error");
        })


})