/*

var arguments = process.argv.splice(2);
var arg = arguments[0];
var arg1 = arguments[1];

console.log('所传递的参数是：', arguments);
console.log(arg,arg1);

*/


var request = require('request');

var str = "<img id=\"img_116075";


var reg1 = /<img id=[^\s]*/;
var res1 = str.match(reg1);
console.log(res1);
console.log(res1[0]);
var no = res1[0].replace("<img id=", "").replace(/"/g, "");
console.log(no);




var url = "http://app.fromfactory.club:8000/product/116075?t=Search&p=1&q=BEA000116075N";
request({
    url: url,
    json: false,

}, function(error, response, users) {

    //console.log(users);

	users = users.replace(/\r\n/g,"").replace(/\n/g,"");
	//console.log(users)
    var reg1 = /<h6 itemprop=\"name\">.*?<\/h6>/m;
    var res1 = users.match(reg1);
    //console.log(res1);
    console.log(res1[0]);
 

})


var str = "你好,.!我们";
var arr = str.split(",.!");
console.log(arr);

/*


var str = "<h6 itemprop=\"name\"> Twist Curls Tool(10Pcs/Set) </h6>";
var reg1 = /<h6 itemprop=\"name\">.*?<\/h6>/m;
    var res1 = str.match(reg1);
    console.log(res1);
    console.log(res1[0]);

    */