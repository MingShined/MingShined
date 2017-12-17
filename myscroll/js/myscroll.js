/* JS Document 
Version:1.0
CreatData:2017/12/17
Author: MingShined
Statement:转载请注明出处,祝大家使用愉快.有什么问题欢迎交流，个人QQ:996578843
*/
$.fn.myscroll = function(opations) {
    var defaults = {
        picWrap: this.find('div').first(),
        ctrlWrap: this.find('div').last(),
        isLibs: true,
        isArrows: true,
        autoPlay: true,
        playTime: 2000,
        effect: 'left',
        playSpeed: 400
    }

    var settings = $.extend(defaults, opations);
    return function() {
        //配置参数
        var $timer = null;
        var $index = 0;
        var $over = true;

        //获取元素
        var $moveWrap = settings.picWrap.find('ul');
        var $moveWrapChild = $moveWrap.children('li');
        var $moveVal = 0;
        var $maxNum = $moveWrap.children('li').length;
        var $oCtrl = settings.ctrlWrap;
        var $libsHtml = '';
        var $arrowsHtml = '';
        var $oLibs = {};

        //设定effect参数
        var $effect = settings.effect;
        var $moveArgs1 = {};
        var $moveArgs2 = {};
        var $moveArgs3 = {};


        //配置播放和移动速度
        var $autoPlay = settings.autoPlay;
        var $playTime = settings.playTime;
        var $playSpeed = settings.playSpeed;

        //配置libs和arrows
        var $isLibs = settings.isLibs;
        var $isArrows = settings.isArrows;
        //是否创建libs
        if ($isLibs) {
            creatLibs();
        }

        function creatLibs() {
            for (var i = 0; i < $maxNum; i++) {
                $libsHtml += '<span class="libs lib' + (i + 1) + '" data-value="' + i + '"></span>';
            }
            $oCtrl.append($libsHtml);
            $oLibs = $oCtrl.children('.libs');
            $oLibs.first().addClass('active');
        }
        //是否创建arrow
        if ($isArrows) {
            creatArrows();
        }

        function creatArrows() {
            var $arrowsHtml = '<span class="arrow prev"></span><span class="arrow next"></span>';
            $oCtrl.append($arrowsHtml);
        }
        //根据effect初始化所有li
        if ($effect == 'left') {
            $moveVal = $moveWrap.children('li').find('img').width();
            $moveArgs1 = {
                left: $moveVal
            }
            $moveArgs2 = {
                left: -$moveVal
            }
            $moveArgs3 = {
                left: 0
            }
            initAllLi();
            picMoveChange();
        } else if ($effect == 'top') {
            $moveVal = $moveWrap.children('li').find('img').height();
            $moveArgs1 = {
                top: $moveVal
            }
            $moveArgs2 = {
                top: -$moveVal
            }
            $moveArgs3 = {
                top: 0
            }
            initAllLi();
            picMoveChange();
        } else {
            $moveArgs1 = {
                'opacity': 0
            }
            $moveArgs2 = {
                'opacity': 1
            }
            initAllLi();
            picFadeChange();
        }
        //初始化所有li
        function initAllLi() {
            $moveWrapChild.each(function(index, el) {
                if (index > 0) {
                    $(el).css($moveArgs1);
                }
            });
        }
        //向上或向右移动
        function picMoveChange() {
            $oCtrl.on('click', 'span', function(event) {
                event.preventDefault();
                if ($(this).attr('class') == "arrow prev") {
                    if ($over) {
                        $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        --$index;
                        $index < 0 ? $index = $maxNum - 1 : $index;
                        $moveWrapChild.eq($index).css($moveArgs2).stop().animate($moveArgs3, $playSpeed, function() {
                            overFunc(true);
                        });
                        if ($isLibs) {
                            libsChange($index);
                        }
                    }
                    overFunc(false);
                } else if ($(this).attr('class') == 'arrow next') {
                    if ($over) {
                        moveNext();
                    }
                    overFunc(false);
                } else {
                    if ($over) {
                        var $that = $(this).attr('data-value');
                        if ($that > $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed);
                            $moveWrapChild.eq($that).css($moveArgs1);
                        } else if ($that < $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                            $moveWrapChild.eq($that).css($moveArgs2);
                        }
                        $index = $that;
                        $moveWrapChild.eq($index).stop().animate($moveArgs3, $playSpeed, function() {
                            overFunc(true);
                        });
                        if ($isLibs) {
                            libsChange($index);
                        }
                    }
                    overFunc(false);
                }
            });
        }
        //淡入淡出
        function picFadeChange() {
            $oCtrl.on('click', 'span', function(event) {
                if ($(this).attr('class') == "arrow prev") {
                    if ($over) {
                        $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        --$index;
                        $index < 0 ? $index = $maxNum - 1 : $index;
                        $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed, function() {
                            overFunc(true);
                        });
                        if ($isLibs) {
                            libsChange($index);
                        }
                    }
                    overFunc(false);
                } else if ($(this).attr('class') == 'arrow next') {
                    if ($over) {
                        fadeNext();
                    }
                    overFunc(false);
                } else {
                    if ($over) {
                        var $that = $(this).attr('data-value');
                        if ($that > $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        } else if ($that < $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        }
                        $index = $that;
                        $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed,function () {
                            overFunc(true);
                        });
                        if ($isLibs) {
                            libsChange($index);
                        }
                    }
                    overFunc(false);
                }
            });
        }
        //自动播放
        if ($autoPlay) {
            autoPlay();
        }

        function autoPlay() {
            clearInterval($timer);
            $timer = setInterval(function() {
                if ($effect == 'fade') {
                    fadeNext();
                } else {
                    moveNext();
                }
            }, $playTime);

        }
        //移入清除定时器
        $oCtrl.hover(function() {
            clearInterval($timer);
        }, function() {
            clearInterval($timer);
            if ($autoPlay) {
                autoPlay();
            }
        });
        //右移动点击箭头
        function moveNext() {
            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed);
            ++$index;
            $index %= $maxNum;
            $moveWrapChild.eq($index).css($moveArgs1).stop().animate($moveArgs3, $playSpeed, function() {
                overFunc(true);
            });
            if ($isLibs) {
                libsChange($index);
            }
        }
        //右淡入淡出点击箭头
        function fadeNext() {
            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
            ++$index;
            $index %= $maxNum;
            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed, function() {
                overFunc(true);
            });
            if ($isLibs) {
                libsChange($index);
            }
        }
        //lib改变
        function libsChange(val) {
            $oLibs.removeClass('active').eq(val).addClass('active');
        }
        //节流
        function overFunc(val) {
            $over = val;
        }
    }(jQuery);
}