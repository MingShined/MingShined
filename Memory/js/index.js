window.onload = function() {
    var show = document.getElementById('show');
    var mask = document.getElementById('mask');
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');

    // 侧边内容滑入
    show.onclick = function() {
        mask.style.display = 'block';
        sidebar.style.transform = 'translate(0, 0)';
        // content.style.transform = 'translateX(80%)';
    }

    // 侧边内容滑出
    mask.onclick = function() {
        mask.style.display = 'none';
        sidebar.style.transform = 'translateX(-100%)';
        // content.style.transform = 'translateX(0)';
    }

    //朋友圈/附近tab切换
    var around = document.getElementById('around');
    var news = document.getElementById('news');
    var f_tab = document.getElementById('f-tab');
    var n_tab = document.getElementById('n-tab');

    tabCard();

    function tabCard() {
        f_tab.onclick = function() {
            news.style.display = 'none';
            around.style.display = 'block';
            f_tab.className = 'open';
            n_tab.className = 'none';
        }
        n_tab.onclick = function() {
            news.style.display = 'block';
            around.style.display = 'none';
            n_tab.className = 'open';
            f_tab.className = 'none';
        }
    }

    //点赞like(形参和实参分布执行)
    function likeFunc(like, thumb) {
        var oLike = document.getElementById(like);
        var oThumb = document.getElementById(thumb);
        var off = true;
        oLike.onclick = function() {
            //加开关，点赞只能点击一次
            if (off) {
                var count = Math.ceil(Math.random() * 20); //生成1-20随机数
                // alert(count);
                oLike.innerText = ++count;
                oThumb.style.color = '#FF7F66';
                off = false; //关闭开关，禁止下次点击
            }
        }
    }

    likeFunc('like1', 'thumb1');
    likeFunc('like2', 'thumb2');
    likeFunc('like3', 'thumb3');

    //评论

    var textArea = document.getElementsByTagName('textarea');
    var publish = document.getElementsByTagName('button');
    var comtBox = document.getElementsByClassName('comment-box');
    var comtBtn = document.getElementsByClassName('comment-btn');
    var comtInfo = document.getElementsByClassName('comment-info');
    // alert(comtBtn.length);
    // alert(commentBox.length)
    // alert(publish.length)
    // alert(textArea.length)

    //评论功能
    for (var i = 0; i < textArea.length; i++) {
        publish[i].index = i;
        var tag = '';
        var time = new Date();
        publish[i].onclick = function() {
            // alert(textArea[this.index].value)
            year = time.getFullYear();
            month = time.getMonth() + 1;
            day = time.getDate();
            hours = time.getHours();
            minutes = time.getMinutes();
            tag = '<li>';
            tag += '陈先生有酒有故事、:' + textArea[this.index].value;
            tag += '<span class="fr">';
            tag += year + '年' + month + '月' + day + '日';
            tag += (hours <= 12 ? '上午' : '下午') + hours + '时' + minutes + '分';
            tag += '</span>' + '<a href="javascript:;" class="fr del">删除</a></li>';
            ul = document.createElement('ul');
            ul.innerHTML = tag;
            comtInfo[this.index].appendChild(ul);
            comtBox[this.index].style.display = 'none';
            //评论删除功能
            del = document.getElementsByClassName('del');
            for (var i = 0; i < del.length; i++) {
                del[i].onclick = function() {
                    ul.removeChild(this.parentNode);
                }
            }
        }
    }



    //评论按钮点击文本框出现
    for (var j = 0, length2 = comtBtn.length; j < length2; j++) {
        comtBtn[j].index = j;
        comtBtn[j].onclick = function() {
            textArea[this.index].value = '';
            comtBox[this.index].style.display = comtBox[this.index].style.display == 'block' ? 'none' : 'block';
        }
    }


    //发布功能
    var public = document.getElementById('public');
    var items = document.getElementsByClassName('items')[0];
    public.onclick = function() {
        around.appendChild(items.cloneNode(true));
    }


    // 分享share功能
    $('#share1').click(function() {
        window.sharetitle = $('#tit1').html();
        // window.shareUrl = $('#img').attr('src');
        share();
    });
    $('#share2').click(function() {
        window.sharetitle = $('#tit2').html();
        // window.shareUrl = $('#img').attr('src');
        share();
    });
    $('#share3').click(function() {
        window.sharetitle = $('#tit3').html();
        // window.shareUrl = $('#img').attr('src');
        share();
    });

    function share() {
        //d指的是window
        (function(s, d, e) {
            try {} catch (e) {}
            var f = 'http://v.t.sina.com.cn/share/share.php?',
                u = d.location.href,
                p = ['url=', e(u), '&title=', e(window.sharetitle), '&appkey=2924220432', '&pic=', e(window.shareUrl)].join('');

            function a() {
                if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))) u.href = [f, p].join('');
            };
            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(a, 0)
            } else {
                a()
            }
        })(screen, document, encodeURIComponent);
    }

    //下拉功能

    var skinBtn = document.getElementById('skinbtn');
    var skinBox = document.getElementById('skin');
    var oHeight = skinBox.style;

    skinBtn.onclick = function() {
        // alert('nihao')
        oHeight.height = oHeight.height == '120px' ? '0' : '120px';
    }



    //更换皮肤
    var oSkin = document.getElementById('skin').getElementsByTagName('div');
    var oColor = ['#0AA6E8', '#F15453', '#435A6B', '#FEF4E4'];
    // alert(oSkin.length)
    for (var i = 0; i < oSkin.length; i++) {
        oSkin[i].index = i;
        oSkin[i].onclick = function() {
            // alert(this.index)
            changeBg(oColor[this.index]);
        }
    }
    var changeBg = function(a) {
        content.style.background = a;
    }


}