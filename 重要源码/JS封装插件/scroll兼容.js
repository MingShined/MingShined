function getScroll() {
        //检测是否支持pageYOffset对象
        if (window.pageYOffset != null) {
            return {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        }
        //不是怪异模式时(怪异模式指的是没有DTD)
        else if (document.compatMode == 'CSS1compat') {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        //怪异模式时
        return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }
