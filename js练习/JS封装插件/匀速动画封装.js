    function animate(elem, target) {
        //清除定时器
        clearInterval(timer);
        //判断前进还是后退
        var speed = elem.offsetLeft - target < 5 ? 5 : -5;
        //设置定时器
        elem.timer = setInterval(function() {
            //定义差值变量
            var result = elem.offsetLeft - target;
            //运动公式
            elem.style.left = elem.offsetLeft + speed + 'px';
            //当差值小于清除定时器，同时跳转到目标位置
            if (Math.abs(result) <= 5) {
                clearInterval(elem.timer);
                elem.style.left = target + 'px';
            }
        }, 20);
    }