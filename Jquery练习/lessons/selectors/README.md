# jQuery Selectors

## Basics
$('code')
$('#myid')
$('.myclass')
$('*')
$('code, #myid, .myclass')

## Hierarchy

$('div code')
$('li > ul')
$('strong + em')	//紧邻之后的兄弟元素(只能是一个)
$('strong ~ em')	//之后的兄弟元素(可以是多个)

## Basic Filters

$('li:first') 	//第一个li
$('li:last')	//最后一个li
$('li:not(li:first)') //除了第一个li
$('li:even') 	//从0开始的偶数位置(理解为奇数)
$('li:odd')		//从0开始的奇数位置(理解为偶数)
$('li:eq(1)')	//eq是等于(基数位从0开始)
$('li:gt(2)')	//gt是大于(基数位从0开始)
$('li:lt(2)')	//lt是小于(基数位从0开始)
$(':header')	//选取所有标题元素 (h1 - h6)
$(':animated')	//选择器选取当前的所有动画元素。

## Content Filters

$('li:contains(second-level)')	//选择内容包含内容的元素
$(':empty')	//选择内容为空的元素
$('li:has(a)')	//选择拥有a标签的li标签
$('p:parent')	//选择内容不为空的元素

## Visibility Filters

$(':hidden') //display none
$(':visible') //display not none

## Attribute Filters

$('li[class]')
$('a[xxx="self"]')
$('a[rel!="nofollow"]')
$('[class^="my"]')	//选择以my开始的class
$('[class$="my"]')	//选择以my结尾的class
$('a[href*="zip"]')	//选择href属性包含zip的a标签
$('a[rel][href][title="blog"]')

## Child Filters

$('li:first-child') //区别于first 当前选择器选择的是第一个子元素,first选择出现的第一个
$('li:last-child')
$('li:nth-child(even)') //偶数(基数位从1开始)
$('li:nth-child(odd)')	//奇数(基数位从1开始)
$('li:nth-child(2)')	//第二个(基数位从1开始)
$('li:nth-child(2n)')
$('code:only-child')

## Forms

$(':input')
$(':text')
$(':password')
$(':radio')
$(':checkbox')
$(':submit')
$(':image')
$(':reset')
$(':button')
$(':file')

## Form Filters

$('input:enabled')
$(':disabled')
$(':checked')
$(':selected')
