/*
coryRight:网易轮播图
author:MingShined
dateTime:2017/10/17
 */

//调用函数接受三个参数(外层盒子id，左右按钮btnClass，轮播滚动时间)
function perfectBanner(bannerId, btnClass, timeVal) {
    //获取参数
    var oBanner = document.getElementById(bannerId);
    var aImg = oBanner.children[0].children;
    var oCtrl = oBanner.children[1];
    var aBtn = document.getElementsByClassName(btnClass);
    var timer = null;
    var index = 0;

    //动态添加libs小圆点
    for (var i = 0; i < aImg.length; i++) {
        var span = document.createElement('span');
        span.setAttribute('class', 'main-banner-libs');
        span.innerHTML = aImg.length - i;
        oCtrl.insertBefore(span, oCtrl.children[1]);
    }

    //获取所有按钮(左右btn，底部libs)
    aTab = oCtrl.children;
    aTab[1].className = 'main-banner-libs current';

    //获取外层盒子宽度
    var scrollVal = oBanner.offsetWidth;
    //动态创建内层pic盒子宽度
    oBanner.children[0].style.width = 2 * scrollVal + 'px';
    //遍历图片盒子，让其位置居于右侧
    for (var i = 1; i < aImg.length; i++) {
        aImg[i].style.left = scrollVal + 'px';
    }

    //遍历所有按钮
    for (key in aTab) {
        aTab[key].onclick = function() {
            //右侧按钮点击
            if (this.className == 'main-banner-btn btn-right') {
                autoPlay();
            }
            //左侧按钮点击
            else if (this.className == 'main-banner-btn btn-left') {
                animate(aImg[index], { left: scrollVal });
                --index < 0 ? index = aImg.length - 1 : index;
                aImg[index].style.left = -scrollVal + 'px';
                animate(aImg[index], { left: 0 });
                libsChange();
            }
            //底部libs点击
            else {
                var that = this.innerHTML - 1;
                if (that > index) {
                    animate(aImg[index], { left: -scrollVal });
                    aImg[that].style.left = scrollVal + 'px';
                } else if (that < index) {
                    animate(aImg[index], { left: scrollVal });
                    aImg[that].style.left = -scrollVal + 'px';
                }
                //将点击索引号赋值给index
                index = that;
                animate(aImg[index], { left: 0 });
                //调用libs改变函数
                libsChange();
            }
        }
    }

    //设置定时器，自动点击右侧按钮
    timer = setInterval(autoPlay, timeVal);

    function autoPlay() {
        animate(aImg[index], { left: -scrollVal });
        ++index > aImg.length - 1 ? index = 0 : index;
        aImg[index].style.left = scrollVal + 'px';
        animate(aImg[index], { left: 0 });
        libsChange();
    }

    //鼠标移入清除定时器，btn显示
    oBanner.onmouseover = function() {
        clearInterval(timer);
        btnFunc('block');
    }
    //鼠标移出开启定时器，btn消失
    oBanner.onmouseout = function() {
        //开启前先清除定时器
        clearInterval(timer);
        timer = setInterval(autoPlay, timeVal);
        btnFunc('none');
    }

    //ilbs改变函数
    function libsChange() {
        for (var i = 1; i < aTab.length - 1; i++) {
            aTab[i].className = 'main-banner-libs';
        }
        aTab[index + 1].className = 'main-banner-libs current';
    }

    //btn消失显示函数
    function btnFunc(val) {
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].style.display = val;
        }
    }

}

//运动函数封装框架(接收三个参数:事件源、运动属性json、回调函数)
function animate(elem, json, callBack) {
    //调用开始清除定时器
    clearInterval(elem.timer);
    //设置对应时间源的定时器
    elem.timer = setInterval(function() {
        //设定开关用来判断动画是否完成指定json数值
        var flag = true;
        //遍历json数值的属性名
        for (attr in json) {
            //设定当前属性值为0
            var current = 0;
            //判断属性值是否是透明度
            if (attr == 'opacity') {
                //获取当前透明度值(当值为undefined时 赋值0)
                current = Math.round(parseInt(getStyle(elem, attr) * 100)) || 0;
            } else {
                //处理当前其他属性值
                current = parseInt(getStyle(elem, attr));
            }
            //设定步长
            var step = (json[attr] - current) / 10;
            //步长取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //当属性值的透明度时
            if (attr == 'opacity') {
                //W3C浏览器
                if ('opacity' in elem.style) {
                    elem.style.opacity = (current + step) / 100;
                } else {
                    // IE浏览器
                    elem.style.filter = 'alpha(opacity = ' + (current + step) * 10 + ')';
                }
                //当属性值是zIndex时
            } else if (attr == 'zIndex') {
                elem.style.zIndex = json[attr];
            }
            //当属性是px数值时
            else {
                elem.style[attr] = current + step + 'px';
            }
            //判断是否到达json给定数值
            if (current != json[attr]) {
                flag = false;
            }
        }
        //动画完成关闭开关清除定时器
        if (flag) {
            clearInterval(elem.timer);
            //调用回调函数
            if (callBack) {
                callBack();
            }
        }
    }, 20);

    //获取对应json属性名的属性值函数
    function getStyle(elem, attr) {
        //IE、Opear浏览器
        if (elem.currentStyle) {
            return elem.currentStyle[attr];
        } else {
            //W3C浏览器
            return window.getComputedStyle(elem, null)[attr];
        }
    }
}