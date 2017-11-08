 var jdProcess = require("./jdProcess.js");
 var my_http = require("./http.js");
 //var mail = require("./mail.js");


var str = "我开始工作了哈";


//mail('67438964@qq.com','开始工作', str);




jdProcess.job();

my_http.start();

var schedule = require("node-schedule");

var rule = new schedule.RecurrenceRule();　　
rule.minute = 2;　　
var j = schedule.scheduleJob(rule, function() {
	console.log("执行任务");　
	jdProcess.job();
});


			
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function (input) {
    inputArr.push(input);
    console.log(inputArr[0]);
    console.log(+inputArr[0]);//转化成数字类型
    inputArr = [];

});




         
		 





/*
var rule = new schedule.RecurrenceRule();　　
var times = [];　　
//for (var i = 1; i < 60; i++) 
{　　　　
    times.push(1);　　
}

rule.second = times;　　
var c = 0;　　
var j = schedule.scheduleJob(rule, function() {　　
    c++;　　
    console.log(c);　　
    job();
});
*/

