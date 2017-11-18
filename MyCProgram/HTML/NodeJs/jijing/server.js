var jijing = require("./jijingProcess.js");
//var test1 = require("./test1.js");
var my_http = require("./http.js");
require('date-utils');



jijing.download();
//jijing.readfile()
my_http.start();



var schedule = require("node-schedule");

var rule = new schedule.RecurrenceRule();　　
rule.minute = 2;　　
var j = schedule.scheduleJob(rule, function() {
	console.log("执行任务");　
	jijing.download();
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



//jijing.readfile();



/*
test1.fun1();

var person = require('./Person.js');

var person1 = new person('James', 'Bond');

console.log(person1.fullName());
*/