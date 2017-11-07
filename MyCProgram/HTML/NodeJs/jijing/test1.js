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
require('date-utils');
var date = new Date();
date.addMonths(1);

var d = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
console.log(d);



var dt = new Date();
var dt1 = dt.toFormat("YYYY-MM-DD");
console.log(dt1);

console.log(dt.toFormat("YYYY-MM-DD HH24:MI:SS"));