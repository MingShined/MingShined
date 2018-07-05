window.onload = function (){
	one();
	two();
};

var one = function(){
	var Tab = document.getElementById('tab').getElementsByTagName('li');
	var Img = document.getElementById('pic').getElementsByTagName('img');
	var index =0 , timer = null;
	for( var i=0;i<Tab.length;i++)
	{
		Tab[i].index = i;
		Tab[i].onmouseover = function(){
			index = this.index;
			clearInterval(timer);
			auto();
		}
		Tab[i].onmouseout = function(){
			time();
		}
	}

	time();
	function time(){
		timer = setInterval(function(){
			index++;
			if (index%5==0) {index=0};
			auto();
			},2500);
	}

	function auto(){
		for( var j =0;j<Tab.length;j++){
			Tab[j].style.background = 'gray';
			Img[j].style.display = 'none';	
		}
		Tab[index].style.background = 'white';
		Img[index].style.display = 'block';	
	}
}


var two = function(){
var Tab2 = document.getElementById('tab2').getElementsByTagName('li');
	var Img2 = document.getElementById('pic2').getElementsByTagName('img');
	var Span2 = document.getElementById('pic2').getElementsByTagName('span');
	var index =0 , timer = null;
	for( var i=0;i<Tab2.length;i++)
	{
		Tab2[i].index = i;
		Tab2[i].onmouseover = function(){
			index = this.index;
			clearInterval(timer);
			auto2();
		}
		Tab2[i].onmouseout = function(){
			time2();
		}
	}

	time2();
	function time2(){
		timer = setInterval(function(){
			index++;
			if (index%5==0) {index=0};
			auto2();
			},3000);
	}

	function auto2(){
		for( var j =0;j<Tab2.length;j++){
			Tab2[j].style.background = 'gray';
			Img2[j].style.display = 'none';	
			Span2[j].style.display = 'none';	
		}
		Tab2[index].style.background = 'black';
		Img2[index].style.display = 'block';
		Span2[index].style.display = 'block';			
	}
}