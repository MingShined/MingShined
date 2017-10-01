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