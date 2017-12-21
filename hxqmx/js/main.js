/* JS Document 
use for:www.18183.com
version:1.0
Data:2017/12/21
Author: MingShined
*/


//登录注册初始化
Passport.on(Passport.EVENTS.loginSuccess, function() {
    window.location.reload();
});
Passport.on(Passport.EVENTS.logoutSuccess, function() {
    window.location.reload();
});

$(function() {
    //雪花
    $(document).snowfall({ deviceorientation: false, round: true, minSize: 4, maxSize: 6, flakeCount: 50 });
})


// 手风琴

var $curJson1 = {
    width: 70
}
var $curJson2 = {
    width: 650
}
$('.accordion').on('mouseenter', 'li', function(event) {
    $(this).stop().animate($curJson2, 400).siblings().stop().animate($curJson1, 400);
});


//视频弹窗
$('.btn-play').on('click', function(event) {
    event.preventDefault();
    var $src = $(this).attr('data-src');
    var $html = '<iframe src="' + $src + '"></iframe><span class="close"></span>'
    $('.mask').fadeIn().find('.alert-video').html('');
    $('.alert-video').html($html).fadeIn(400);
    $('.alert-video').find('.close').on('click', function(event) {
        event.preventDefault();
        $('.alert-video').empty().fadeOut(400).parents('.mask').fadeOut(400);
    });
});


//上传图片弹窗
$('.btn-upload').on('click', function() {
    if (!Passport.isLoggedIn()) {
        Passport.Dialog.show();
    } else {
        alertBoxShow('.item1');
    }
})


//上传图片
var agent = window.navigator.userAgent;
var dataH = []; //上传地址数组
var g;
var isIE7 = agent.indexOf('MSIE 7.0') != -1;
var isIE8 = agent.indexOf('M<div></div>SIE 8.0') != -1;
var isIE9 = agent.indexOf('MSIE 9.0') != -1;
var imF = document.getElementById("webuploader");
var max = 512000;

var changeBack = function(e) {
    //IE7、IE8、IE9获得文件路径
    if (isIE7 || isIE8 || isIE9) {
        $(this).select();
        filepath = document.selection.createRange().text;
        imgList(filepath);
    } else {
        var n = $("#webuploader").prop('files');
        g = n.length;
        g > 0 ? $(".upload-img").show() : $(".upload-img").hide();
        for (var i = 0; i < g; i++) {
            var oFile = document.getElementById('webuploader').files[i];
            if (oFile.size > max) {
                alert('图片不能超过500k');
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(oFile);
            reader.onload = function(e) {
                imgList(this.result, i);
            };
        }
    };
};
var imgList = function(s) {
    if ($.inArray(s, dataH) == -1) {
        dataH.push(s);
        var im = '<img src="' + s + '" alt="" /><a class="ucos" href="javascript:;"></a>';
        $(".upload-img").append(im);
        $(".upload-wrap").hide();
        $(".upload-img").show();
        $(".upload-img").find('.ucos').click(function(event) {
            if (isIE7 || isIE8 || isIE9) {
                $(".webuploader").remove();
                $(".upload-wrap").append('<input class="webuploader" id="webuploader" type="file" name="file" multiple="multiple" accept="image/*">');
                $(".webuploader").bind("change", changeBack);
            };
            dataH.splice($(this).parent().find("img").index(), 1);
            $(this).parent().find("img").remove();
            $(".upload-img").hide();
            $(".upload-wrap").show();
            if (dataH.length == 0) {
                $(".upload-img").hide();
                $(".upload-wrap").show();

            };
            return dataH;
        });
    } else {
        return;
    };
};
$(".webuploader").bind("change", changeBack);

function checkSubmit() {
    var len = dataH.length;
    var $gameName = $('.gamename').val();
    var $gameServe = $('.gameserve').val();
    var $qq = $('.qq').val();
    var $tel = $('.tel').val();
    // console.log(len);
    if ($gameName == '' || $gameName == 'undefined') {
        myalert('请填写游戏昵称');
        return false;
    }

    if ($gameServe == '' || $gameServe == 'undefined') {
        myalert('请填写游戏区服');
        return false;
    }

    if ($qq == "undefined" || $qq == "") {
        myalert("请输入QQ哦~");
        return false;
    } else if ($qq.length > 11 || $qq.length < 5) {
        myalert("QQ号长度为5-11位哦~");
        return false;
    }

    if ($tel == "undefined" || $tel == "") {
        myalert("请输入电话哦~");
        return false;
    } else if ($tel.length != 11) {
        myalert("请输入合法的电话号码哦~");
        return false;
    }


    if (len <= 0) {
        myalert('请最少上传1张图片');
        return false;
    }
    if (len > 1) {
        myalert('对不起，最多只能上传1张图片');
        return false;
    }
    $("#dataH").val(dataH);
    var form = $('#form1');
    var url = form.attr('action');
    $.ajax({
            type: 'POST',
            url: url,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: form.serialize(),
            dataType: 'json'
        })
        .success(function(data) {
            alert(data.msg);
            console.log(data)
            if (data.code > 0) {
                location.reload();
            }
        })
        .error(function() {
            myalert('上传失败!');
        });
    return false;
}


//展示图片

/*ie8map兼容 */
if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined")
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function")
        }
        if (thisArg) {
            T = thisArg
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue
            }
            k++;
        }
        return A;
    }
}



var myPicdir = 'http://img3.18183.com';
var sqlJson = [];
$.ajax({
    url: 'http://hd.18183.com/api/201712hxqmx?action=votelist',
    type: 'POST',
    data: {
        page: 1,
        pagesize: 100
    },
    dataType: 'JSONP',
    async: false,
    success: function(res) {
        console.log(res)
        if (res.list.length > 0) {
            res.list.map(function(e, i) {
                var sqlJsonItem = {};
                sqlJsonItem['src'] = myPicdir + e.picurl1;
                sqlJsonItem['name'] = e.name;
                sqlJson.push(sqlJsonItem);
            });

            var page = 0; /*当前页*/
            var total = sqlJson.length; /*//总条数*/
            var pageNum = 6; /*每次滚动加载个数*/
            var totalPage = Math.ceil(total / pageNum); /*//总页数*/
            var ajax = !1; //*/是否加载中*/

            function imgloading() {
                if (!loading.data("on")) return;
                if (!ajax) {
                    loading.data("on", false).fadeIn(800);
                    (function(sqlJson) {
                        if (page >= totalPage) {
                            loading.css('background', 'none').text('全部加载完毕');
                        } else {
                            var html = "";
                            var max_elem = Math.min((page + 1) * pageNum, total);
                            for (var i = page * pageNum; i < max_elem; i++) {
                                html += '<li><div class="top"><p>ID：<span class="nickname">' + sqlJson[i].name + '</span></p></div>';
                                html += '<div class="mid"><img src="' + sqlJson[i].src + '" alt=""></div><div class="bottom"></div></li>';
                                ajax = !1;
                            }
                            /*模拟ajax请求数据时延时800毫秒*/
                            var time = setTimeout(function() {
                                $(html).find('img').each(function(index) {
                                    loadImage($(this).attr('src'));
                                })
                                var $newElems = $(html).css({
                                    opacity: 0
                                }).appendTo(container);
                                $newElems.imagesLoaded(function() {
                                    $newElems.animate({
                                        opacity: 1
                                    }, 800);
                                    container.masonry('appended', $newElems, true);
                                    /*loading.data("on",true).fadeOut();*/
                                    loading.data("on", true);
                                    clearTimeout(time);
                                });
                            }, 800);
                            page++;
                        }
                    })(sqlJson);
                }
            }
            /*$(window).scroll(function(){*/
            /*默认执行一次*/
            imgloading();
            /*点击执行一次*/
            $('.imgloading').click(function() {
                imgloading();
            });


        }
    }
});


var container = $('.masonry');
var loading = $('.imgloading');
/*初始化状态*/
loading.data("on", true);
container.imagesLoaded(function() {
    container.masonry({
        itemSelector: 'li',
        gutter: 21,
        columnWidth: 306
    });
});

loadImage('http://js.18183.com/public/img/loading.gif');

function loadImage(url) {
    var img = new Image();
    /*创建一个Image对象，实现图片的预下载*/
    img.src = url;
    if (img.complete) {
        return img.src;
    }
    img.onload = function() {
        return img.src;
    };
};


//弹窗出现
function alertBoxShow(elem, msg) {
    if (msg) {
        $('.mask').fadeIn(400).children(elem).find('.msg').text('msg').fadeIn(400);
    } else {
        $('.mask').fadeIn(400).children(elem).fadeIn(400);
    }
}
//弹窗关闭
function alertBoxClose(elem) {
    $(elem).fadeOut().parents('.mask').fadeOut();
}

//弹窗信息
function myalert(msg) {
    alert(msg);
}

//雪花
$(document).snowfall({ deviceorientation: false, round: true, minSize: 4, maxSize: 6, flakeCount: 50 });