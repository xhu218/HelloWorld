var fileHelper = require("./fileHelper.js");
var fs = require("fs");

var readLines = require("./readline.js");
var writelog = require("./writelog.js");
var path = require("path")
var request = require('request');
var basemethod = require('./basemethod.js')

var arguments = process.argv.splice(2);
writelog('所传递的参数是：', arguments);

var file = arguments[0];

writelog("start...");


var input = fs.createReadStream(file);
readLines(input, func);

var doingIndex = 0;
var totalline = 0;
var alldata = [];
var result = "";

function func(line) {

    alldata.push(line);
    totalline++;
    writelog("enqueue . " + totalline + "/ 647");
    if (totalline == 647) {
        console.log("我已经做完了")

        for (var i = 0; i < alldata.length; i++) {
            result = result + "'" + alldata[i].trim() + " Archive To Near_Line_AkGroup_1" + "',\r\n";
            result = result + "'" + alldata[i].trim() + " ArchiveCopy To Near_Line_AkGroup_2" + "',\r\n";
        }

        fileHelper.writetoFile(result, path.join(__dirname, "result.txt"), true);
       
    }


}



writelog("end...");