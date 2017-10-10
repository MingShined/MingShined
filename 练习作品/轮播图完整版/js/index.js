window.onload = function() {
    bannerFunc('banner1', 1000);
    bannerFunc('banner2', 1300);

    function bannerFunc(id, timeVal) {

        //获取参数
        var pic = $(id).children[0];
        var img = pic.children;
        var length = img.length;
        var tab = $(id).children[1];
        var btn = $(id).children[2];
        var leftBtn = $(id).children[2].children[0];
        var rightBtn = $(id).children[2].children[1];
        //配置初始化变量
        var leader = 0;
        var target = 0;
        var timer = null;
        var index = 0;

        //根据图片张数动态创建li
        var ul = document.createElement('ul');
        var tag = '<li class="current"></li>';
        for (var i = 0; i < length - 1; i++) {
            tag += '<li></li>';
        }
        ul.innerHTML = tag;
        tab.appendChild(ul);

        //根据图片张数动态创建pic盒子的宽度
        pic.style.width = length * 100 + '%';
        //获取li的个数
        var li = tab.children[0].children;

        //设置自动轮播定时器
        time(timeVal);

        function time() {
            timer = setInterval(function() {
                index++;
                index %= length;
                change();
            }, timeVal);
        }

        //tab圆点移入移出事件
        for (var i = 0; i < length; i++) {
            li[i].index = i;
            li[i].onmouseover = function() {
                index = this.index;
                clearInterval(timer);
                change();
            }
            li[i].onmouseout = function() {
                time();
            }
        }

        //图片、按钮移入时清空定时器，按钮显示
        pic.onmouseover = btn.onmouseover = function() {
            clearInterval(timer);
            btn.style.display = 'block';
        }

        //图片、按钮移入时启动定时器，按钮消失
        pic.onmouseout = btn.onmouseout = function() {
            time();
            btn.style.display = 'none';
        }

        //左按钮点击事件
        leftBtn.onclick = function() {
            index--;
            if (index < 0) { index = length - 1; }
            change();
        }

        //右按钮点击事件
        rightBtn.onclick = function() {
            index++;
            index %= length;
            change();
        }

        //减速函数
        setInterval(function() {
            leader = leader + (target - leader) / 10;
            pic.style.left = leader + 'px';
        }, 20);

        //图片、小圆点移动函数
        function change() {
            for (var j = 0; j < length; j++) {
                li[j].setAttribute('class', '');
            }
            li[index].setAttribute('class', 'current');
            target = -1226 * index;
        }

        //获取id函数
        function $(id) {
            return typeof(id) === 'string' ? document.getElementById(id) : id;
        }
    }
}