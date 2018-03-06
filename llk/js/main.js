////美女连连看


$('.btn-play').on('click', function(event) {
    $('.beauty').gameLLK();
    $(this).fadeOut();
});

$.fn.gameLLK = function($options) {

    var $defaults = {
        // row:
        time:120,
        gameWinCbk:function (t) {
            alert('您用时' + t + 's');
        }
    }

    var $settings = $.extend($defaults,$options);

    //具体游戏流程
    gameStar();
    function gameStar() {
        var starTime = $settings.time;
        var timeVal = $settings.time;
        var timer = null;
        var count = 0;
        clearInterval(timer);
        //加载随机顺序图片
        picRandom();

        //设置120s倒计时
        timer = setInterval(function() {
            --timeVal;
            $('.startime').text(timeVal + 's');
            if (timeVal == -1) {
                // alertBoxShow('.item1');
                clearInterval(timer);
                alert('亲，时间到');
            $('.startime').text(0 + 's');
                return false;
            } else {
                $('.beauty ul').on('click', 'li', function() {
                    //不配对
                    if ($(this).attr('data-roleid') != $('.active').attr('data-roleid')) {
                        $(this).addClass('active').siblings().removeClass('active');
                    } else if ($(this).index() === $('.active').index()) { //是否本身
                        return;
                    } else { //配对
                        $(this).stop().animate({
                            opacity: 0
                        }, 400).siblings('.active').stop().animate({
                            opacity: 0
                        }, 400, function() {
                            ++count;
                            if (count == 12) {
                                clearInterval(timer);
                                endTime = parseInt(starTime - timeVal);
                                // $('.endtime').text(timeVal);
                                // gameWin(timeVal);
                                $settings.gameWinCbk(endTime);
                            }
                        });
                    }
                });
            }
        }, 1000)
    }


    //图片随机

    function picRandom() {
        var randomArr1 = [];
        var randomArr2 = [];
        var randomArr3 = [];
        for (var i = 1; i <= 12; i++) {
            randomArr1.push(i);
            randomArr2.push(i);
            randomArr3.push(i - 1);
        }
        randomArr1.sort(function() {
            return 0.5 - Math.random();
        })
        randomArr2.sort(function() {
            return 0.5 - Math.random();
        })
        randomArr3.sort(function() {
            return 0.5 - Math.random();
        })

        var html1 = '';
        var html2 = '';
        for (var i = 0; i <= 11; i++) {
            html1 += '<li data-roleid="' + randomArr1[i] + '"><img src="images/role' + randomArr1[i] + '.jpg" alt=""></li>'

        }

        $('.beauty ul').append(html1);
        // $('.beauty ul').append(html2);
        for (var j = 0; j <= 11; j++) {
            html2 = '<li data-roleid="' + randomArr2[j] + '"><img src="images/role' + randomArr2[j] + '.jpg" alt=""></li>';
            if (j % 2 == 0) {
                $('.beauty ul').children('li').eq(randomArr3[j]).before(html2);
            } else {
                $('.beauty ul').children('li').eq(randomArr3[j]).after(html2);
            }
        }

    }


    //游戏结束传入时间
    // function gameWin(t) {
    //     $.ajax({
    //             url: 'http://hd.18183.com/api/201712sd?action=upload',
    //             type: 'post',
    //             dataType: 'json',
    //             xhrFields: {
    //                 withCredentials: true
    //             },
    //             crossDomain: true,
    //             data: {
    //                 type: 3,
    //                 gametime: t
    //             },
    //         })
    //         .done(function(data) {
    //             alertBoxShow('.item6');
    //         })
    //         .fail(function() {})
    // }
}