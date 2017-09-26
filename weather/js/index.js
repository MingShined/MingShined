function weather(data) {
    var d = data.weather;
    var area = data.area[2][0];
    var oDate = document.getElementById('date');
    // var dayHTML = document.getElementById('day').innerHTML = ' ';
    // var nightHTML = document.getElementById('night').innerHTML = ' ';
    for (var i = 0; i < d.length - 4; i++) {
        // var day = document.getElementById('day');
        var date = d[i].date;
        var day = d[i].info.day;
        var night = d[i].info.night;
        var tag = '';
        var Tag = '';

        //时间
        oDate.innerHTML = '今天:' + date;

        //温度
        document.getElementById('temval').innerHTML = day[2] + '℃';
        //地区
        document.getElementById('cityName').innerHTML = area;

        // 白天
        tag += '<li class="animated bounceInLeft"><i class="iconfont icon-wendu"></i>温度:' + day[2] + '℃' + '</li>';
        tag += '<li class="animated bounceInLeft t2"><i class="iconfont icon-tianqi"></i>天气:' + day[1] + '</li>';
        tag += '<li class="animated bounceInLeft t3"><i class="iconfont icon-fengxiang"></i>风向:' + day[3] + '</li>'
        tag += '<li class="animated bounceInLeft t4"><i class="iconfont icon-fengsu"></i>风速:' + day[4] + '</li>'
        var Dayul = document.createElement('ul');
        Dayul.innerHTML = tag;
        document.getElementById('day').appendChild(Dayul);

        //晚上

        Tag += '<li class="animated bounceInRight">温度:' + night[2] + '℃' + '<i class="iconfont icon-wendu"></i></li>';
        Tag += '<li class="animated bounceInRight t2">天气:' + night[1] + '<i class="iconfont icon-tianqi"></i></li>';
        Tag += '<li class="animated bounceInRight t3">风向:' + night[3] + '<i class="iconfont icon-fengxiang"></i></li>'
        Tag += '<li class="animated bounceInRight t4">风速:' + night[4] + '<i class="iconfont icon-fengsu"></i></li>'
        var Nightul = document.createElement('ul');
        Nightul.innerHTML = Tag;
        document.getElementById('night').appendChild(Nightul);

    }
}