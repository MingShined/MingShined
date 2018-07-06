! function(win, option) {
    var count = 0,
        designWidth = option.designWidth,
        designHeight = option.designHeight || 0,
        designFontSize = option.designFontSize || 100,
        callback = option.callback || null,
        root = document.documentElement,
        body = document.body,
        rootWidth, newSize, t, self;
    //杩斿洖root鍏冪礌瀛椾綋璁＄畻缁撴灉
    function _getNewFontSize() {
        var iw = win.innerWidth > 750 ? 750 : win.innerWidth;
        var scale = designHeight !== 0 ? Math.min(iw / designWidth, win.innerHeight / designHeight) : iw / designWidth;
        return parseInt(scale * 10000 * designFontSize) / 10000;
    }! function() {
        rootWidth = root.getBoundingClientRect().width;
        self = self ? self : arguments.callee;
        //濡傛灉姝ゆ椂灞忓箷瀹藉害涓嶅噯纭紝灏卞皾璇曞啀娆¤幏鍙栧垎杈ㄧ巼锛屽彧灏濊瘯20娆★紝鍚﹀垯浣跨敤win.innerWidth璁＄畻
        if (rootWidth !== win.innerWidth && count < 20) {
            win.setTimeout(function() {
                count++;
                self();
            }, 0);
        } else {
            newSize = _getNewFontSize();
            //濡傛灉css宸茬粡鍏煎褰撳墠鍒嗚鲸鐜囧氨涓嶇浜�
            if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
                root.style.fontSize = newSize + "px";
                return callback && callback(newSize);
            };
        };
    }();
    //妯珫灞忓垏鎹㈢殑鏃跺€欐敼鍙榝ontSize锛屾牴鎹渶瑕侀€夋嫨浣跨敤
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        clearTimeout(t);
        t = setTimeout(function() {
            self();
        }, 200);
    }, false);
}(window, {
    designWidth: 750
});