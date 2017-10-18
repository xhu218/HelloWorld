//console.log("hello world");
var fs = require('fs');

var path = "E:\\Work\\GitHub\\HTML\\JQuery\\cmapilog\\WebApi.CMApi_Message.log";
var data = fs.readFileSync(path, 'utf8');

//var patt1 = /\[[0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,}\.[0-9]{4,}\][\S\s]*?收到请求：[\S\s]*?发送应答[\S\s]*?收到/gm;
var patt1 = /\[[0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,}\.[0-9]{4,}\][\S\s]*?收到请求：[\S\s]*? 发送应答：[\S\s]*(?!\[2017)/g;
arr = data.match(patt1);
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    console.log("---------------------------");

    //var regex = /\[([0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,}\.[0-9]{4,})\][\S\s]*?收到请求：([\S\s]*?)发送应答([\S\s]*?)收到/gm;
    var regex = /\[([0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,}\.[0-9]{4,})\][\S\s]*?收到请求：([\S\s]*?)\[(2017-10-10 00:00:02.3943)\]\[TRACE\]\[WebApi\.CMApi_Message\] 发送应答([\S\s]*?)收到/gm;
    regex.exec(arr[i]);
    console.log("请求时间："+RegExp.$1);
    console.log("请求消息："+RegExp.$2);
    console.log("应答时间："+RegExp.$3);
    console.log("应答消息："+RegExp.$4);

}