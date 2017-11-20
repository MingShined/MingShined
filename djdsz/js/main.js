/* 
JS OR CSS DOCUMENT USE 
FOR:        www.18183.com
VERSION:    1.00
DATE:       2017/11/16
AUTHOR:     MingShined
*/

// 二维码跟随
$(window).scroll(function() {
    var $scrollVal = $(this).scrollTop() + 200;
    $('.code').stop().animate({
        top: $scrollVal
    }, 400);
})

//自己写的轮播图封装插件
//建议下次不要装逼，用别人的插件
var pageFunc = {
    scrollFunc: function(oWarp, oCtrl, oLibs, oClass, oSpeed, cb) {
        var $timer = null;
        var $index = 0;
        var $moveWrap = oWarp.find('ul');
        var $moveWrapChild = $moveWrap.children('li');
        var $moveVal = $moveWrap.children('li').find('img').width();
        var $maxNum = $moveWrap.children('li').length;
        var $ulWidthVal = $moveVal * 2 + 'px';
        var $oCtrl = oCtrl;
        var $oLibs = oLibs;
        var $oClass = oClass;
        var $oSpeedVal = oSpeed;
        if ($oSpeedVal) {
            $oSpeedVal = oSpeed;
        } else {
            $oSpeedVal = 400;
        }
        $moveWrap.css('width', $ulWidthVal);
        $moveWrapChild.each(function(index, el) {
            if (index > 0) {
                $(el).css({ left: $moveVal });
            }
        });
        $oCtrl.on('click', 'span', function(event) {
            event.preventDefault();
            if ($(this).attr('class') == "arrow prev") {
                $moveWrapChild.eq($index).stop().animate({ left: $moveVal }, $oSpeedVal);
                --$index;
                $index < 0 ? $index = $maxNum - 1 : $index;
                $moveWrapChild.eq($index).css({ left: -$moveVal }).stop().animate({ left: 0 }, $oSpeedVal);
                libsChange($oLibs, $index, $oClass);
            } else if ($(this).attr('class') == 'arrow next') {
                autoPlay();
            } else {
                var $that = $(this).attr('data-value');
                if ($that > $index) {
                    $moveWrapChild.eq($index).stop().animate({ left: -$moveVal }, $oSpeedVal);
                    $moveWrapChild.eq($that).css({ left: $moveVal });
                } else if ($that < $index) {
                    $moveWrapChild.eq($index).stop().animate({ left: $moveVal }, $oSpeedVal);
                    $moveWrapChild.eq($that).css({ left: -$moveVal });
                }
                $index = $that;
                $moveWrapChild.eq($index).stop().animate({ left: 0 }, $oSpeedVal);
                libsChange($oLibs, $index, $oClass);
            }
            if (cb) {
                cb();
            }

            function libsChange(elem, val, classname) {
                elem.removeClass(classname).eq(val).addClass(classname);
            }

            function autoPlay() {
                $moveWrapChild.eq($index).stop().animate({ left: -$moveVal }, $oSpeedVal);
                ++$index;
                $index %= $maxNum;
                $moveWrapChild.eq($index).css({ left: $moveVal }).stop().animate({ left: 0 }, $oSpeedVal);
                libsChange($oLibs, $index, $oClass);
            }
        });
    }
}