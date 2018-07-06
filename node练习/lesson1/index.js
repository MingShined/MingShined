var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//处理body json格式
app.use(bodyParser.json());
//处理body string格式
app.use(bodyParser.urlencoded({
	extended: false
}))

//配置静态文件目录
app.use(express.static(__dirname + '/static'));

//配置路由
// app.get('/',function (req,res) {
// 	res.send('Hello Node');
// })
app.use('/',require('./routes/user.js'));

//开启监听
var server = app.listen(8080,function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host + port)
});