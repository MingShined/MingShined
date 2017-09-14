var show = document.getElementById('show');
var quit = document.getElementById('quit');
var mask = document.getElementById('mask');
var sidebar = document.getElementById('sidebar');
var content = document.getElementById('content');
show.onclick = function () {
	mask.style.display = 'block';
	sidebar.style.transform = 'translate(0, 0)';
	content.style.transform = 'translateX(80%)';
	quit.style.left = '102%';
}
quit.onclick = function () {
	mask.style.display = 'none';
	sidebar.style.transform = 'translateX(-100%)';
	content.style.transform = 'translateX(0)';
	quit.style.left = '0';
}