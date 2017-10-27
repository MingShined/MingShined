# JQuery Best Practice
###DOM MANIPULATION
######二逼
```javascript
    // Set's an element's title attribute using it's current text
    $(".container input#item").attr("title", $(".container input#item").text());

    // Set's an element's text color to red
    $(".container input#item").css("color", "red");

    // Makes the element fade out
    $(".container input#item").fadeOut();
```
######普通
```javascript
    // Set's an element's title attribute using it's current text
    $("#item").attr("title", $("#item").text());

    // Set's an element's text color to red
    $("#item").css("color", "red");

    // Makes the element fade out
    $("#item").fadeOut();
```
######文艺
```javascript
    // Stores the live DOM element inside of a variable
    var elem = $("#item");

    // Set's an element's title attribute using it's current text
    elem.attr("title", elem.text());

    // Set's an element's text color to red
    elem.css("color", "red");

    // Makes the element fade out
    elem.fadeOut();
```
######文艺+
```javascript
    // Stores the live DOM element inside of a variable
    var elem = $("#item");

    // Chaining
    elem.attr("title", elem.text()).css("color", "red").fadeOut();
```
###DOM INSERTION
######普通
```javascript
    // Dynamically building an unordered list from an array
    var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
    list = $("ul.people");

    $.each(localArr, function(index, value) {

    list.append("<li id=" + index + ">" + value + "</li>");

    });
```
######文艺
```javascript
    // Dynamically building an unordered list from an array
    var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
        list = $("ul.people"),
        dynamicItems = "";

    $.each(localArr, function(index, value) {

        dynamicItems += "<li id=" + index + ">" + value + "</li>";

    });

    list.append(dynamicItems);
```
###EVENT HANDLING
######二逼
```javascript
    $("#longlist li").on("mouseenter", function() {

        $(this).text("Click me!");

    });

    $("#longlist li").on("click", function() {

        $(this).text("Why did you click me?!");

    });
```
######普通
```javascript
    var listItems = $("#longlist li");
    listItems.on({

        "mouseenter": function() {

            $(this).text("Click me!");

        },

        "click": function() {

            $(this).text("Why did you click me?!");

        }
    });
```
######文艺
```javascript
    var list = $("#longlist");

    list.on("mouseenter", "li", function(){

        $(this).text("Click me!");

    });

    list.on("click", "li", function() {

        $(this).text("Why did you click me?!");

    });
```



