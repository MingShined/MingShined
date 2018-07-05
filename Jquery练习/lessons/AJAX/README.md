# JQuery AJAX

* load( url, [data], [callback] ) ：载入远程 HTML 文件代码并插入至 DOM 中。

url (String) : 请求的HTML页的URL地址。

data (Map) : (可选参数) 发送至服务器的 key/value 数据。

callback (Callback) : (可选参数) 请求完成时(不需要是success的)的回调函数。

* $.get( url, [data], [callback] )：使用GET方式来进行异步请求

url (String) :  发送请求的URL地址.

data (Map) : (可选) 要发送给服务器的数据，以 Key/value 的键值对形式表示，会做为QueryString附加到请求URL中。

callback (Function) : (可选) 载入成功时回调函数(只有当Response的返回状态是success才是调用该方法)。

* $.post( url, [data], [callback], [type] ) ：使用POST方式来进行异步请求

url (String) : 发送请求的URL地址.

data (Map) : (可选) 要发送给服务器的数据，以 Key/value 的键值对形式表示。

callback (Function) : (可选) 载入成功时回调函数(只有当Response的返回状态是success才是调用该方法)。

type (String) : (可选)官方的说明是：Type of data to be sent。其实应该为客户端请求的类型(JSON,XML,等等)

* $.getScript( url, [callback] ) : 通过 GET 方式请求载入并执行一个 JavaScript 文件。

url (String) : 待载入 JS 文件地址。

callback (Function) : (可选) 成功载入后回调函数。

* $.ajax 事件
```javascript
// Using the core $.ajax() method
$.ajax({
    // the URL for the request
    url: "post.php",

    // the data to send (will be converted to a query string)
    data: {
        id: 123
    },

    // whether this is a POST or GET request
    type: "GET",

    // the type of data we expect back
    dataType : "json",

    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {
        $( "<h1/>" ).text( json.title ).appendTo( "body" );
        $( "<div class=\"content\"/>").html( json.html ).appendTo( "body" );
    },

    // code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },

    // code to run regardless of success or failure
    complete: function( xhr, status ) {
        alert( "The request is complete!" );
    },

    beforeSend: function() {
    },
    cache: true //false
});
```
beforeSend, cache

