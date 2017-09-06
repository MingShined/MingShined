var pic = document.getElementById('pic').getElementsByTagName('img');
var tab = document.getElementById('tab').getElementsByTagName('li');
var index = 0,
	timer = null;

for (var i = 0; i < tab.length; i++) {
	tab[i].index = i;
	tab[i].onmouseover = function() {
		index = this.index;
		clearInterval(timer);
		auto();
	}
	tab[i].onmouseout = function() {
		time();
	}
}

time();

function time() {
	timer = setInterval(function() {
		index++;
		if (index > 5) {
			index = 0;
		}
		auto();
	}, 2000);

}

function auto() {
	for (var j = 0; j < tab.length; j++) {
		pic[j].style.display = 'none';
		tab[j].style.background = '#ccc';
	}
	pic[index].style.display = 'block';
	tab[index].style.background = '#fff';
}