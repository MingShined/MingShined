/*
coryRight:传智学院
author:MingShined
dateTime:2017/10/17
 */

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
            } else if (attr == 'zIndex') {
                //当属性值是zIndex时
                elem.style.zIndex = json[attr];
            } else {
                //当属性是px数值时
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

    //获取非行内css属性值
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