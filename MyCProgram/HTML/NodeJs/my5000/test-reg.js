/*

var readline = require("./readline.js");
var path = require("path")
var fs = require("fs");

var file = path.join(__dirname,"data","1104.txt");
var input = fs.createReadStream(file);
readline(input, func);

function func(line){
	console.log(line);
}


*/


var str = "wfg.jpg";
var index = str.lastIndexOf(".");
var ext = str.substring(index);
console.log(index, ext);




var str = "<img id=\"img_409827\" class=\"img img-responsive lazy\" src=\"http://d3kpm7yklociqe.cloudfront.net/nsr/static/img/lazy_load.png\" data-src=\"http://d1vs5fqeka2glf.cloudfront.net/2d/60/2df3ce7cd4b08a677ac846c725e01460_200x200.jpg\" data-us-price=\"20.12\" data-product-no=\"AMC000409827N\" data-category=\"100003086\"/>";


　
//var str = '1223334444';
var reg = /data-src=[^\s]*/;
var res = str.match(reg);
console.log(res) //["12", "23", "33", "44", "44"]
console.log(res[0].replace("data-src=", ""));

var imgid = res[0].replace("data-src=", "");
var index = imgid.lastIndexOf(".");
var ext = imgid.substring(index);

console.log(ext);


var reg1 = /data-product-no=[^\s]*/;
var res1 = str.match(reg1);
console.log(res1);
console.log(res1[0].replace("data-product-no=", ""));