var jijing = require("./jijingProcess.js");
//var test1 = require("./test1.js");
var my_http = require("./http.js");
require('date-utils');
var fund_stock = require("./fund_stock.js");

//fund_stock.getalltheinfo();





jijing.download();
//jijing.readfile()
//fund_stock.getalltheinfo();
//my_http.start();






/*

var schedule = require("node-schedule");

var rule1 = new schedule.RecurrenceRule();　　
rule1.dayOfWeek = [0, new schedule.Range(1, 5)];　
rule1.hour = 15;　
rule1.minute = 30;
var job1 = schedule.scheduleJob(rule1, function() {
    console.log("执行任务");　
    jijing.download();
    fund_stock.getalltheinfo();

});
*/
/*


var rule2 = new schedule.RecurrenceRule();　　
rule2.dayOfWeek = [0, new schedule.Range(1, 5)];　
rule2.hour = 16;　
rule2.minute = 30;
var job1 = schedule.scheduleJob(rule2, function() {


    console.log("执行任务");　

});


*/


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function(input) {
    inputArr.push(input);
    console.log(inputArr[0]);
    console.log(+inputArr[0]); //转化成数字类型
    inputArr = [];

});



//jijing.readfile();



/*
test1.fun1();

var person = require('./Person.js');

var person1 = new person('James', 'Bond');

console.log(person1.fullName());
*/