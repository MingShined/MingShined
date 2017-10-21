//普通版
function tabVal(val) {
    var oTarget = document.getElementById(val);
    var oLibs = oTarget.getElementsByTagName('li');
    var oCont = oTarget.getElementsByTagName('span');
    for (var i = 0; i < oLibs.length; i++) {
        oLibs[i].index = i;
        oLibs[i].onclick = function() {
            // index = this.index;
            for (var j = 0, length2 = oLibs.length; j < length2; j++) {
                oLibs[j].className = "";
                oCont[j].className = "content";
            }
            oLibs[this.index].className = "current";
            oCont[this.index].className = "content block";
        }
    }
}

//闭包版
function tabVal(val) {
    var oTarget = document.getElementById(val);
    var oLibs = oTarget.getElementsByTagName('li');
    var oCont = oTarget.getElementsByTagName('span');
    for (var i = 0; i < oLibs.length; i++) {
        oLibs[i].onclick = function(val) {
            return function() {
                for (var j = 0, length2 = oLibs.length; j < length2; j++) {
                    oLibs[j].setAttribute('class', '');
                    oCont[j].style.display = 'none';
                }
                oLibs[val].setAttribute('class', 'current');
                oCont[val].style.display = 'block';
            }
        }(i);
    }
}

//闭包节流版
function tabVal(val) {
    var oTarget = document.getElementById(val);
    var oLibs = oTarget.getElementsByTagName('li');
    var oCont = oTarget.getElementsByTagName('span');
    for (var i = 0; i < oLibs.length; i++) {
        var timer = null;
        oLibs[i].onmouseover = function(val) {
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    for (var j = 0, length2 = oLibs.length; j < length2; j++) {
                        oLibs[j].setAttribute('class', '');
                        oCont[j].style.display = 'none';
                    }
                    oLibs[val].setAttribute('class', 'current');
                    oCont[val].style.display = 'block';
                }, 500);
            }
        }(i);
        oLibs[i].onmouseout = function() {
            clearTimeout(timer);
        }
    }
}