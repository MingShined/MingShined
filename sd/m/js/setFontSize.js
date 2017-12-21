/*
 # 按照宽高比例设定html字体, width=device-width initial-scale=1版
 # @pargam win 窗口window对象
 # @pargam option{
 designWidth: 设计稿宽度，必须
 designHeight: 设计稿高度，不传的话则比例按照宽度来计算，可选
 designFontSize: 设计稿宽高下用于计算的字体大小，默认20，可选
 callback: 字体计算之后的回调函数，可选
 }
 # ps:请尽量第一时间运行此js计算字体
 */

! function(win, option) {
    var setFontSize = document.getElementById("setFontSize");
    if (setFontSize != undefined) {
        option.designHeight = parseInt(setFontSize.getAttribute("data-hg"));
    };
    var count = 0,
        designWidth = option.designWidth,
        designHeight = option.designHeight || 0,
        designFontSize = option.designFontSize || 100,
        callback = option.callback || null,
        root = document.documentElement,
        body = document.body,
        rootWidth,
        newSize,
        t,
        self; //返回root元素字体计算结果
    function _getNewFontSize() {
        var iw = win.innerWidth > 800 ? 800 : win.innerWidth;
        var scale = designHeight !== 0 ? Math.min(iw / designWidth, win.innerHeight / designHeight) : iw / designWidth;
        return parseInt(scale * 10000 * designFontSize) / 10000;
    }! function() {
        rootWidth = root.getBoundingClientRect().width;
        self = self ? self : arguments.callee; //如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
        if (rootWidth !== win.innerWidth && count < 20) {
            win.setTimeout(function() {
                count++;
                self();
            }, 0);
        } else {
            newSize = _getNewFontSize(); //如果css已经兼容当前分辨率就不管了
            if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
                root.style.fontSize = newSize + "px";
                return callback && callback(newSize);
            };
        };
    }
    (); //横竖屏切换的时候改变fontSize，根据需要选择使用
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        clearTimeout(t);
        t = setTimeout(function() {
            self();
        }, 200);
    }, false);
}

(window, {
        designWidth: 800,
        designHeight: 1334
    }

);