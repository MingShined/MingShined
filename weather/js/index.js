function weather(data) {
    var d = data.weather;
    var oDate = document.getElementById('date');
    var dayHTML = document.getElementById('day').innerHTML = ' ';
    var nightHTML = document.getElementById('night').innerHTML = ' ';
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


        // 白天
        tag += '<li><i class="iconfont icon-tianqi">温度:</i>' + day[2] + '℃' + '</li>';
        tag += '<li><i class="iconfont icon-tianqi">天气:</i>' + day[1] + '</li>';
        tag += '<li><i class="iconfont icon-tianqi">风向:' + day[3] + '</i></li>'
        tag += '<li><i class="iconfont icon-tianqi">风速:' + day[4] + '</i></li>'
        var ul = document.createElement('ul');
        ul.innerHTML = tag;
        document.getElementById('day').appendChild(ul);

        //晚上

        Tag += '<li><i class="iconfont icon-tianqi">温度:</i>' + night[2] + '℃' + '</li>';
        Tag += '<li><i class="iconfont icon-tianqi">天气:</i>' + night[1] + '</li>';
        Tag += '<li><i class="iconfont icon-tianqi">风向:' + night[3] + '</i></li>'
        Tag += '<li><i class="iconfont icon-tianqi">风速:' + night[4] + '</i></li>'
        var Ul = document.createElement('ul');
        Ul.innerHTML = Tag;
        document.getElementById('night').appendChild(Ul);

    }
}