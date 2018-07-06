var express = require('express');

var router = express.Router();

//get post all
router.all('/user', function(req, res) {
    console.log(req.method);
    console.log(req.baseUrl);
    console.log(req.path);


    console.log(req.header['user-agent']);
    console.log(req.get('user-agent'));

    console.log(req.query);
    console.log(req.query.key);

    //post 请求时获取body参数
    console.log(req.body);
    console.log(req.body.id);

    res.send('我是user路由返回的数据');

})

//返回状态码
router.get('/status', function(req, res) {
    res.status(200).send('status 200');
})

//返回json
router.get('/json', function(req, res) {
    res.json({
        name: '123',
        age: 21
    })
})

//返回contentType
router.get('/file', function(req, res) {
    res.contentType('application/javascript');
    res.sendFile('/test.js',{root:__dirname + '/../static'});
})

module.exports = router;