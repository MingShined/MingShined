// 关闭广告条

var sDown = document.getElementById('sdown');
var cBanner = document.getElementById('cBanner');

cBanner.onclick = function s() {
    sDown.style.display = 'none';
}

// 遍历背景图

var oSpan = document.getElementById('list').getElementsByTagName('span');
// alert(oSpan.length)
for (var i = 1; i < oSpan.length; i++) {
    oSpan[i].style.backgroundPosition = "0" + -25 * i + "px";
}

//获取参数
var list = document.getElementById('side-menu').getElementsByTagName('li');
var item = document.getElementsByClassName('item');
var menuCont = document.getElementById('menu-content');
// alert(item.length)
// alert(list.length)

//遍历菜单导航鼠标移入事件
for (var i = 0; i < list.length; i++) {
    //获取相对于i的索引值给index(因为之后访问不到i)
    list[i].index = i;
    list[i].onmouseover = function() {
        //内容显示
        menuClass('menu-content');
        //全部重置(排他思想)
        for (var j = 0, length2 = list.length; j < length2; j++) {
            item[j].style.display = 'none';
            list[j].style.background = 'none';
        }
        //当前对应内容显示
        item[this.index].style.display = 'block';
        this.style.background = '#ddd';
    }
    //导航菜单鼠标移出时内容消失
    list[i].onmouseout = function() {
        menuClass('menu-content hide');
    }
}

//内容鼠标移入时显示
menuCont.onmouseover = function() {
    menuClass('menu-content');
}

//内容鼠标移入时消失
menuCont.onmouseout = function() {
    menuClass('menu-content hide');
}

//内容显示/消失 函数
function menuClass(val) {
    menuCont.className = val;
}