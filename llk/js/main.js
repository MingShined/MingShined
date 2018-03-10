////美女连连看

$.fn.gameLLK = function($options) {

    var $defaults = {
        picNum: 12,
        time: 120,
        gameWinCbk: function gameWinCbk(t) {
            // $.ajax({
            //         url: '',
            //         type: 'post',
            //         dataType: 'json',
            //         xhrFields: {
            //             withCredentials: true
            //         },
            //         crossDomain: true,
            //         data: {
            //             type: 3,
            //             gametime: t
            //         },
            //     })
            //     .done(function(data) {
            //         alertBoxShow('.item6');
            //     })
            //     .fail(function() {})
        }
    }

    var $settings = $.extend($defaults, $options);

    //配置参数
    var starTime = $settings.time;
    var timeVal = $settings.time;
    var picNum1 = $settings.picNum;
    var picNum2 = picNum1 - 1;

    //具体游戏流程
    gameStar();

    function gameStar() {
        $('.beauty').css('background', '#555392').addClass('beautyActive');
        $('#bgmusic').get(0).play();
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
                clearInterval(timer);
                $('.startime').text(0 + 's');
                $('#bgmusic').get(0).pause();
                $('#lose').get(0).play();
                gameWin(false);
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
                            opacity: 0,
                        }, 400, function() {
                            setTimeout(function() {
                                audioRightFun();
                            }, 1);
                        }).siblings('.active').stop().animate({
                            opacity: 0
                        }, 400, function() {
                            ++count;
                            if (count == picNum1) {
                                clearInterval(timer);
                                endTime = parseInt(starTime - timeVal);
                                gameWin(true,endTime);
                                $settings.gameWinCbk();
                                $('#bgmusic').get(0).pause();
                                $('#win').get(0).play();
                            }
                        });
                    }
                });
            }
        }, 1000)
    }

    function audioRightFun() {
        $('#right').get(0).play();
    }

    function audioWrongFun() {
        $('#wrong').get(0).play();
    }

    //图片随机

    function picRandom() {
        var randomArr1 = [];
        var randomArr2 = [];
        var randomArr3 = [];
        for (var i = 1; i <= picNum1; i++) {
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
        for (var i = 0; i <= picNum2; i++) {
            html1 += '<li data-roleid="' + randomArr1[i] + '"><img src="images/role' + randomArr1[i] + '.jpg" alt=""></li>'

        }

        $('.beauty ul').append(html1);
        for (var j = 0; j <= picNum2; j++) {
            html2 = '<li data-roleid="' + randomArr2[j] + '"><img src="images/role' + randomArr2[j] + '.jpg" alt=""></li>';
            if (j % 2 == 0) {
                $('.beauty ul').children('li').eq(randomArr3[j]).before(html2);
            } else {
                $('.beauty ul').children('li').eq(randomArr3[j]).after(html2);
            }
        }

    }

    //游戏结束传入时间
    function gameWin(flag,t) {
        if (flag) {
            $('.endtime').text(t);
        }else {
            $('.game-result').find('p').html('时间到啦~');
        }
        $('.beauty').slideUp();
        $('.mask').fadeIn().find('.game-result').fadeIn();
    }

    //在玩一次
    $('.play-again').on('click', function() {
        location.reload();
    });
}