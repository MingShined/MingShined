    var datas = document.getElementById('datas').innerHTML;

    function handle() {
        var data = datas.split(",");
        var word = document.getElementById('text').value;
        var value = "";
        for (var i = 1; i < data.length; i++) {
            if (word != "" && data[i].match(word + ".*") != null) {
                value += "<span onclick=add('" + data[i] + "'>" + data[i] + "</span>&nbsp;";
            }
        }
        document.getElementById('msg').innerHTML = value;
    }

    function add(city) {
        document.getElementById('text').value = city;
    }
    //firefox下检测状态改变只能用oninput,且需要用addEventListener来注册事件。   
    if (/msie/i.test(navigator.userAgent)) //ie浏览器   
    {
        document.getElementById('text').onpropertychange = handle
    } else { //非ie浏览器，比如Firefox   
        document.getElementById('text').addEventListener("input", handle, false);
    }