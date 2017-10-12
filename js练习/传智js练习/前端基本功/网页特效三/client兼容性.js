function getClient() {
	//最新浏览器和ie9+
    if (window.innerWidth != null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } 
    //普通浏览器
    else if (document.compatMode === 'CSS1Compat') {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    //怪异模式
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}