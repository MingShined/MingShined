var show = document.getElementById('show');
var quit = document.getElementById('quit');
var mask = document.getElementById('mask');
var sidebar = document.getElementById('sidebar');
var content = document.getElementById('content');
show.onclick = function() {
	mask.style.display = 'block';
	sidebar.style.transform = 'translate(0, 0)';
	content.style.transform = 'translateX(80%)';
	quit.style.left = '102%';
}
quit.onclick = function() {
	mask.style.display = 'none';
	sidebar.style.transform = 'translateX(-100%)';
	content.style.transform = 'translateX(0)';
	quit.style.left = '0';
}


$('#btn').click(function() {
	window.sharetitle = $('#tit').html();
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