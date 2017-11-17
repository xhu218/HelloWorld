/*

var request1 = require("./request.js");
var test1 = {

    fun1: function() {

        console.log("start...");

        var tempStr = "http://www.baidu.com";
        var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=2&pn=50&dx=1&v=0.005266926352829326";
        request1.setUrl(url);

        var goods = request1.sendRequest(function(url, content) {

            //console.log(url. content);
            console.log(url);
            console.log("end...");
            this.fun2();

        });

    },
    fun2: function(){
        console.log("this is fun2");
    }
}

module.exports = test1;

*/

/*
require('date-utils');
var date = new Date();
date.addMonths(1);

var d = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
console.log(d);



var dt = new Date();
var dt1 = dt.toFormat("YYYY-MM-DD");
console.log(dt1);

console.log(dt.toFormat("YYYY-MM-DD HH24:MI:SS"));

*/


var fs = require("fs");
var path = require("path");
fs.exists("./Data", function(exists) {
    if (exists) {
        console.log("文件存在")
    }
    if (!exists) {
        console.log("文件不存在")
    }
});

var fs = require("fs");

var parentFolder = path.join(__dirname, "Data", "Last3Year");
var file = path.join(parentFolder, "200.josn");
var content = "hello wfg";

console.log("test..."+ path.resolve(file,"../.."));

if (!fs.existsSync(parentFolder)) {
    fs.mkdirSync(parentFolder);
}

fs.writeFile(file, content, function(err) {
    if (err) {
        console.log("fail" + err)
    } else {
        console.log("写入文件成功 : " + file);
    }

});


var str = "wfglxx";
var str1 = str.replace("wfg","lxx");
console.log(str1);