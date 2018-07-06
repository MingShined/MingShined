var demo = new init('cms',21);



function init (userName,age) {
	this.userName = userName;
	this.age = age;
}


init.prototype.getUserName = function(){
	console.log(this.userName);
	this.getUserAge();
};

init.prototype.getUserAge = function(){
	console.log(this.age);
};



demo.getUserName();