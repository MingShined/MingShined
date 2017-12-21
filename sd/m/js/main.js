/* JS Document 
use for:www.18183.com
version:1.0
Data:2017/12/14
Author: MingShined
*/

//登录注册初始化
Passport.on(Passport.EVENTS.loginSuccess, function() {
    window.location.reload();
});
Passport.on(Passport.EVENTS.logoutSuccess, function() {
    window.location.reload();
});



//登录奖励和签到奖励
$('.sign').on('click', function(event) {
    if (!Passport.isLoggedIn()) {
        Passport.Dialog.show();
    } else {
        $.ajax({
                url: 'http://hd.18183.com/api/201712sd?action=sign',
                type: 'get',
                dataType: 'jsonP',
            })
            .done(function(data) {
                var $code = data.code;
                if ($code == 0) {
                    alertBoxShow('.item8');
                } else if ($code == -2) {
                    alertBoxShow('.item9');
                } else if ($code == -3) {
                    alertBoxShow('.item4');
                }
                commonInfo(false);
            })
            .fail(function(error) {
                alert(error.msg);
            })
    }
});



var $drawNum = 0;
var $standerAns = [];
var $ids = [];
commonInfo(false);

function commonInfo(flag) {
    //通用信息
    $.ajax({
            url: 'http://hd.18183.com/api/201712sd',
            type: 'post',
            dataType: 'jsonP',
        })
        .done(function(data) {
            var $daycount = data.daycount;
            if ($daycount >= 0) {
                $('.drawnum').html($daycount);
                $drawNum = parseInt($('.drawnum').html());
            }
            if (flag) {
                //获取答题信息
                var $questions = data.questions;
                var $html = '';
                var $quesArr = [];
                for (var i in $questions) {
                    $quesArr = $questions[i].option.split('\n');
                    // $arr.push($quesArr)
                    $html += '<li><div class="title">' + $questions[i].title + '</div>'
                    $html += '<div class="answer"><span data-ansid="A"></span>' + $quesArr[0] + '</div>';
                    $html += '<div class="answer"><span data-ansid="B"></span>' + $quesArr[1] + '</div>';
                    $html += '<div class="answer"><span data-ansid="C"></span>' + $quesArr[2] + '</div></li>';
                    $standerAns.push($questions[i].answer);
                    $ids.push(i);
                }
                $('.test-rule ul').append($html);
            }
        })
        .fail(function() {})
}



// 抽奖
$('.btn-draw').on('click', function(event) {
    if (!Passport.isLoggedIn()) {
        Passport.Dialog.show();
    } else {
        if ($drawNum > 0) {
            --$drawNum;
            $('.drawnum').html($drawNum);
            lotteryFunc();
        } else {
            $('.mask,.item5').fadeIn();
            return;
        }

        function lotteryFunc() {
            $.ajax({
                    url: 'http://hd.18183.com/api/201712sd?action=draw',
                    type: 'post',
                    dataType: 'jsonP',
                })
                .done(function(data) {
                    var $code = data.code;
                    var $msg = data.msg;
                    if ($code == -1) { //未登录
                        if (!Passport.isLoggedIn()) {
                            Passport.Dialog.show();
                        }
                    } else if ($code == -2) { //次数不足
                        alertBoxShow('.item5');
                    } else if ($code == -3) { //活动结束
                        alert(msg);
                        alertBoxShow('.item4');
                    } else if ($code > 0) { //中奖
                        $('.item2 .prize').html('恭喜您获得' + $msg);
                        alertBoxShow('.item2');
                    } else { //未中奖
                        alertBoxShow('.item3');
                    }
                })
                .fail(function() {})
        }
    }

});



//美女连连看


//开始游戏
$('.btn-play').on('click', function(event) {
    if (!Passport.isLoggedIn()) {
        Passport.Dialog.show();
    } else {
        var $that = $(this);
        var $currId = $(this).attr('id');
        $.ajax({
                url: 'http://hd.18183.com/api/201712sd?action=vote',
                type: 'post',
                dataType: 'jsonP',
                data: {
                    gid: $currId
                },
            })
            .done(function(data) {
                var $code = data.code;
                if ($code == 1) {
                    //游戏开始
                    $that.fadeOut();
                    gameStar();
                } else if ($code == -3) {
                    //今天玩过了
                    alertBoxShow('.item7');
                }
            })
            .fail(function() {})
    }
});

//具体游戏流程
function gameStar() {
    var $timeVal = $('.startime').text();
    var $timer = null;
    var $count = 0;
    clearInterval($timer);
    //加载随机顺序图片
    picRandom();

    //设置120s倒计时
    $timer = setInterval(function() {
        --$timeVal;
        $('.startime').text($timeVal);
        if ($timeVal == 0) {
            alertBoxShow('.item1');
            clearInterval($timer);
            return;
        } else {
            $('.pic-wrap').on('click', 'li', function(event) {
                //不配对
                if ($(this).attr('data-roleid') != $('.on').attr('data-roleid')) {
                    $(this).addClass('on').siblings().removeClass('on');
                } else if ($(this).index() === $('.on').index()) { //是否本身
                    return;
                } else { //配对
                    $(this).stop().animate({
                        opacity: 0
                    }, 400).siblings('.on').stop().animate({
                        opacity: 0
                    }, 400, function() {
                        ++$count;
                        if ($count == 12) {
                            clearInterval($timer);
                            $timeVal = parseInt(120 - $timeVal);
                            $('.endtime').text($timeVal);
                            gameWin($timeVal);
                        }
                    });
                }
            });
        }
    }, 1000)
}


//图片随机

function picRandom() {
    var $randomArr1 = [];
    var $randomArr2 = [];
    for (var i = 1; i <= 12; i++) {
        $randomArr1[i] = i;
        $randomArr2[i] = i;
    }
    $randomArr1.sort(function() {
        return 0.5 - Math.random()
    })
    $randomArr2.sort(function() {
        return 0.5 - Math.random()
    })

    var $html1 = '';
    var $html2 = '';
    for (var i = 0; i < $randomArr1.length - 1; i++) {
        $html1 += '<li class="list" data-roleid="' + $randomArr1[i] + '"><img src="http://js.18183.com/hd/2017/201712sd/m/images/role' + $randomArr1[i] + '.jpg" alt=""></li>';
        $html2 += '<li class="list" data-roleid="' + $randomArr2[i] + '"><img src="http://js.18183.com/hd/2017/201712sd/m/images/role' + $randomArr2[i] + '.jpg" alt=""></li>';
    }

    $('.pic-wrap').append($html1);
    $('.pic-wrap').append($html2);
}


//游戏结束传入时间
function gameWin(t) {
    $.ajax({
            url: 'http://hd.18183.com/api/201712sd?action=upload',
            type: 'post',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                type: 3,
                gametime: t
            },
        })
        .done(function(data) {
            alertBoxShow('.item6');
        })
        .fail(function() {})
}


//留言墙

//发送留言

$('.btn-send').on('click', function(event) {
    if (!Passport.isLoggedIn()) {
        Passport.Dialog.show();
    } else {
        var $message = $('.text-box').val();
        if ($message == '') {
            alertBoxShow('.item12')
        } else {
            $.ajax({
                    url: 'http://hd.18183.com/api/201712sd?action=message',
                    type: 'post',
                    dataType: 'jsonP',
                    data: {
                        content: $message
                    },
                })
                .done(function(data) {
                    $('.text-box').val('');
                    var $code = data.code;
                    if ($code == 1) {
                        alertBoxShow('.item10');
                    } else if ($code == -3) {
                        alertBoxShow('.item17');
                    }
                })
                .fail(function() {})
        }
    }
});

//获取留言

$.ajax({
        url: 'http://hd.18183.com/api/201712sd?action=messagelist',
        type: 'post',
        dataType: 'jsonP',
        data: {
            page: 1
        },
    })
    .done(function(data) {
        if (data) {
            var $html = '';
            var $count = data.count;
            $count = $count > 6 ? 6 : data.count;
            for (var i = 0; i < $count; i++) {
                $html += '<div class="draggable"><span></span>';
                $html += '<p class="message">' + data[i].content + '</p>';
                $html += '<p class="nickname fr">——' + data[i].username + '</p></div>';
            }
            $('.message-wall').append($html);
            messageWall();
        }
    })
    .fail(function() {})


function messageWall() {

    //调用拖动插件
    $('.draggable').draggabilly({
        containment: true,
        random: true
    });

    //定义随机位置
    var $parentW = $('.message-wall').width();
    var $parentH = $('.message-wall').height();

    $('.draggable').each(function(index, el) {
        $(el).css({
            'visibility': 'visible',
            'top': parseInt(Math.random() * ($parentH - $(el).height() - 50)),
            'left': parseInt(Math.random() * ($parentW - $(el).width() - 30))
        });
    });

    //浮动
    $('.message-wall').on('touchstart', '.draggable', function(event) {
        $(this).css('zIndex', $('.draggable').length).siblings().css('zIndex', '2');
    });

}

//答题

var $testIndex = -1;
var $titleCount = $('.test-info .num').text();
var $lastCount = $titleCount - 1;
var $passCount = 2;
var $userAns = [];

$('.star-test').on('click', function(event) {
    if ($passCount <= 0) {
        if ($('.test-rule .active span').length > 0) {
            $testIndex++;
        } else {
            return;
        }
    } else {
        $testIndex++;
    }
    if ($testIndex <= 0) {
        starTest();
    } else if ($testIndex <= $lastCount) {
        doingTest();
        if ($testIndex == $lastCount) {
            $('.innertext').text('完成考试');
        }
    } else {
        testOver();
    }
});


//开始考试

var $testTimer = null;

function starTest() {
    $.ajax({
            url: 'http://hd.18183.com/api/201712sd?action=share_down',
            type: 'get',
            dataType: 'jsonP',
        })
        .done(function(data) {
            var $code = data.code;
            if ($code == 1) {
                $('.test-rule').css('background', 'none');
                commonInfo(true);
                $('.innertext').html('下一题(pass:' + $passCount + ')');
                $testTimer = setInterval(function() {
                    if ($('.testtime').text() == '00:00') {
                        alertBoxShow('.item15');
                        $('.test-rule').empty().html('感谢您的参与!');
                        clearInterval($testTimer)
                    } else if ($wrongNum == 3) {
                        alertBoxShow('.item16');
                        $('.test-rule').empty().html('感谢您的参与!');
                        clearInterval($testTimer);
                    } else {
                        setThreeMinute();
                    }
                }, 1000);
            } else if ($code == -3) {
                alertBoxShow('.item14');
                $('.star-test').off();
            }

        })
        .fail(function() {})
}


//正在考试
function doingTest() {
    var $isActive = $('.test-rule').find('.active').length;
    if ($isActive == 0) {
        --$passCount;
        if ($passCount < 0) {
            return;
        } else {
            $('.innertext').html('下一题(pass:' + $passCount + ')');
            $userAns.push(' ');
            titleCountSub();
            checkAnswers();
            nextQues();
        }
    } else if ($isActive == 1) {
        $userAns.push($('.test-rule .active span').attr('data-ansid'));
        titleCountSub();
        checkAnswers();
        nextQues();
        $('.test-rule .active').removeClass('active');
    }
}

//下个问题
function nextQues() {
    $('.test-rule ul').stop().animate({
        left: -4.46 * $testIndex + 'rem'
    })
}

//总题数减1
function titleCountSub() {
    --$titleCount;
    $('.test-info .num').text($titleCount);
}

//选择答案
$('.test-rule').on('click', '.answer', function(event) {
    $(this).addClass('active').siblings().removeClass('active');
});


//验证答案
var $rightNum = 0;
var $wrongNum = 0;
var $score = 0;

function checkAnswers() {
    if ($standerAns[$testIndex - 1] == $userAns[$testIndex - 1]) {
        ++$rightNum;
        $score = 4 * $rightNum;
        $('.rightnum').html($rightNum);
        $('.score').html($score);
    } else if (($userAns[$testIndex - 1] != ' ') && ($standerAns[$testIndex - 1] != $userAns[$testIndex - 1])) {
        ++$wrongNum;
        $('.wrongnum').html($wrongNum);
    }
}


//提交考试
function testOver() {
    var $isActive = $('.test-rule').find('.active').length;
    if ($isActive == 0) {
        --$passCount;
        if ($passCount < 0) {
            return;
        } else {
            $('.innertext').html('完成考试(pass:' + $passCount + ')');
        }
        $userAns.push(' ');
        checkAnswers();
    } else {
        $userAns.push($('.test-rule .active span').attr('data-ansid'));
        checkAnswers();
    }
    $.ajax({
            url: 'http://hd.18183.com/api/201712sd?action=play',
            type: 'post',
            dataType: 'jsonP',
            data: {
                score: $score
            },
        })
        .done(function(data) {
            var $code = data.code;
            if ($code == 0) {
                alertBoxShow('.item13');
            }
            $('.test-rule').empty().html('感谢您的参与!');
        })
        .fail(function() {})
}


//三分钟倒计时
var $minute = 3;
var $second = 0;
var $timeVal = 0;

function setThreeMinute() {
    if ($second == 0) {
        if ($minute == 0) {
            return '00:00';
        } else {
            $minute--;
            $second = 59;
        }
    } else {
        $second--;
    }
    $timeVal = ($minute < 10 ? ('0' + $minute) : ($minute + '')) + ':' + ($second < 10 ? ('0' + $second) : ($second + ''));
    $('.testtime').empty().text($timeVal);
}



//分屏
var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        hashNavigation: true
    },
});

//点击下一屏/切换圣诞
$('.btn-nextpage').on('click', function(event) {
    swiper.slideNext(1000);
});

//切换圣诞
$('.btn-sd').on('click', function(event) {
    swiper.slideTo(1, 5, false);
});

//切换元旦
$('.btn-yd').on('click', function(event) {
    swiper.slideTo(3, 5, false);
});

//返回首页
$('.btn-sy').on('click', function(event) {
    swiper.slideTo(0, 5, false);
});

//点我分享
$('.btn-share').on('click', function(event) {
    $('.share-mask').fadeIn();
});

$('.share-mask .btn-sure').on('click', function(event) {
    $('.share-mask').fadeOut();
});

//卡车动画
// setTimeout(function() {
//     $('.car').css('opacity', '1');
// }, 7000)


//弹窗出现
function alertBoxShow(elem) {
    if (elem === '.item6') {
        $('.item6').on('click', '.close,.btn-sure', function(event) {
            $('.startime').text(120);
            $('.btn-play').fadeIn();
        });
    }
    $('.mask').fadeIn(400).children(elem).fadeIn(400);
}
//弹窗关闭
function alertBoxClose(elem) {
    $(elem).fadeOut().parents('.mask').fadeOut();
}

//弹窗信息
function myalert(msg) {
    alert(msg);
}