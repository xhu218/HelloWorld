var fs = require("fs");
var path = require("path")
var request = require('request');


var fileHelper = require("./fileHelper.js");
var readLines = require("./readline.js");
var writelog = require("./writelog.js");
var basemethod = require('./basemethod.js')

var arguments = process.argv.splice(2);
writelog('所传递的参数是：', arguments);

var file = arguments[0];

writelog("start...");



var input = fs.createReadStream(file,{"encoding":"utf-8"});
readLines(input, func);


var totalline = 0;
var alldata = [];
var data = "";

var findstr = [

"50f5dbe9373e45f4bee52b701a0119cc"




]

function func(line, args2) {  

    if (totalline == 0) {
        //alldata.push(line);
        data+=line;
    }

    if ((totalline++) % 5000 == 0) {
        console.log(totalline, args2);

    }
    for (var index = 0; index < findstr.length; index++) {
        if (line.indexOf(findstr[index]) > 0) {
            console.log(line);
            //alldata.push(line);
            data+=line;
        }
    }


    if (args2 == "end") {
        console.log("end");
        var dt = new Date();
        var filename = dt.toFormat("YYYYMMDDHH24MISS") + ".csv";

        var file = path.join(__dirname, "data/" + filename);

        fileHelper.writetoFile(data, file, false, function(file) {
                console.log(file + "写完了");
            }

        )
    }


} 



writelog("end...");