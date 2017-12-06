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
        } else {
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

    //     var swiper = new Swiper('#future', {  
    //     loop : true,  
    //     effect: 'coverflow',  
    //     grabCursor: true,  
    //     centeredSlides: true,  
    //     slidesPerView: 'auto',  
    //     coverflow: {  
    //         rotate: 0,// 旋转的角度  
    //         stretch: 100,// 拉伸   图片间左右的间距和密集度  
    //         depth: 100,// 深度   切换图片间上下的间距和密集度  
    //         modifier: 4,// 修正值 该值越大前面的效果越明显  
    //         // slideShadows : true// 页面阴影效果  
    //     }  
    // });  


    //获取IP
    $.ajax({
            url: 'https://weixin.jirengu.com/weather/ip',
            type: 'get',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data);
            var $cityIp = data.data;
            getCityId($cityIp);
        })
        .fail(function() {
            console.log("error");
        })

    //根据IP、经纬度、城市名、获取城市ID
    function getCityId(cityIp) {
        $.ajax({
                url: 'https://weixin.jirengu.com/weather/cityid?location=' + cityIp,
                type: 'get',
                dataType: 'json',
            })
            .done(function(data) {
                console.log(data);
                var $cityId = data.results[0].id;
                getWeatherInfo($cityId);
            })
            .fail(function() {
                console.log("error");
            })
    }

    //根据城市ID获取当天天气
    function getWeatherInfo(cityId) {
        $.ajax({
                url: 'https://weixin.jirengu.com/weather/now?cityid=' + cityId,
                type: 'get',
                dataType: 'json',
            })
            .done(function(data) {
                console.log(data)
                //分解json节点
                var $weather = data.weather[0];
                var $now = $weather.now;
                var $today = $weather.today;
                var $future = $weather.future;
                console.log($future[1].code1)
                //获取日期
                var $date = $weather.last_update.substring(0, 10).replace(/-/g, "/");
                $('.date').text($date);
                //获取城市名称和id
                $('.cityname').text($weather.city_name);
                $('.cityid').text($weather.city_id);
                //获取温度和天气字段
                var $codeImg = 'https://weixin.jirengu.com/images/weather/code/' + $now.code + '.png';
                var $suggestionImg = '';
                $('.temp').text($now.temperature + '°').next().find('.codeimg').attr('src', $codeImg);
                $('.codetext').text('/ ' + $now.text);
                //获取详细信息和未来六天天气数据
                var $infoName = [$now.wind_direction + '风', '风速', '湿度', '可见度', '日出', '日落'];
                var $infoVal = [$now.wind_scale + '级', $now.wind_speed, $now.humidity, $now.visibility, $today.sunset, $today.sunrise]
                var $suggessVal = [
                    $today.suggestion.dressing,
                    $today.suggestion.uv,
                    $today.suggestion.car_washing,
                    $today.suggestion.travel,
                    $today.suggestion.flu,
                    $today.suggestion.sport
                ]
                var $html = '';
                for (var i = 0; i < $('.info li').length; i++) {
                    $suggestionImg = 'https://weixin.jirengu.com/images/weather/code/' + $future[i].code2 + '.png';
                    $('.info li').eq(i).text($infoName[i] + '/' + $infoVal[i]);
                    $('#tips .tips-desc').eq(i).text($suggessVal[i].details);
                    $html += '<div class="swiper-slide"><ul>';
                    $html += '<li>' + $future[i + 1].day + '</li>';
                    $html += '<li>' + $future[i + 1].text + '</li>';
                    $html += '<li><img src="' + $suggestionImg + '" /></li>';
                    $html += '<li>' + $future[i + 1].low + '~' + $future[i].high + '</li>';
                    $html += '</ul></div>';
                }
                $('#future .swiper-wrapper').append($html);
                setTimeout(function() {
                    $('.mask').slideUp(400);
                }, 4000);

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
                // 未来六天天气滑屏
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
            .fail(function() {
                console.log("error");
            })
    }

})