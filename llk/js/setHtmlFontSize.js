/*
 # 鎸夌収瀹介珮姣斾緥璁惧畾html瀛椾綋, width=device-width initial-scale=1鐗�
 # @pargam win 绐楀彛window瀵硅薄
 # @pargam option{
 designWidth: 璁捐绋垮搴︼紝蹇呴』
 designHeight: 璁捐绋块珮搴︼紝涓嶄紶鐨勮瘽鍒欐瘮渚嬫寜鐓у搴︽潵璁＄畻锛屽彲閫�
 designFontSize: 璁捐绋垮楂樹笅鐢ㄤ簬璁＄畻鐨勫瓧浣撳ぇ灏忥紝榛樿20锛屽彲閫�
 callback: 瀛椾綋璁＄畻涔嬪悗鐨勫洖璋冨嚱鏁帮紝鍙€�
 }
 # ps:璇峰敖閲忕涓€鏃堕棿杩愯姝s璁＄畻瀛椾綋
 */
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