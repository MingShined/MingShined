// $(function(){
// 	var index = 0;
// 	var timeplay = null;
// 	$('.tab ul li').mouseover(function() {
// 		index = $(this).index();
// 		clearInterval(timeplay);
// 		change();
// 	}).mouseout(function() {
// 		time();
// 	});;

// 	$('.right').click(function() {
// 		index++;
// 		index%=6;
// 		change();
// 	});

// 	$('.left').click(function() {
// 		index--;
// 		if(index<0) index=5;
// 		change();
// 	});

// 	time();
// 	function time(){
// 		timeplay = setInterval(function(){
// 			index++;
// 			index%=6;
// 			change();
// 		},4500);
// 	}

// 	function change(){
// 		$('.pic img').eq(index).fadeIn().siblings().fadeOut();
// 		// $('.pic').animate({'marginTop' : -1920 * index + 'px'},500);
// 		$('.tab ul li').eq(index).addClass('on').siblings().removeClass('on');	
// 	}

// 	$('.banner').hover(function() {
// 		$('.left,.right').show();
// 		// clearInterval(timeplay);
// 	},function() {
// 		$('.left,.right').hide();
// 		// time();	
// 	});
// });
// 
// 
// 
 window.onload = function(){
	var Img = document.getElementById('pic').getElementsByTagName('img');
	var index =0 , timer = null;

	time();
	function time(){
		timer = setInterval(function(){
			index++;
			if (index%6==0) {index=0};
			auto();
			},1000);
	}

	function auto(){
		for( var j =0;j<Img.length;j++){
			Img[j].style.display = 'none';	
		}
		Img[index].style.display = 'block';	
	}
}
