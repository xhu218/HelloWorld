/*
现场ARCHIVE数据库与SQLLITE不对等，找出其中的差异
*/

var fs = require("fs");
var path = require("path");
require('date-utils');

var readLines = require("./readline.js");

//var input = fs.createReadStream("a:\\20171220 153407.txt");
var input = fs.createReadStream("C:\\Users\\WangFugui\\Desktop\\different.txt");
var input2 = fs.createReadStream("E:\\LOGS\\2018\\2018-09\\2018-09-21\\TV2 Lorry\\Transfer_all.sql");



readLines(input, func);



var dt = new Date();
var folder = dt.toFormat("YYYYMMDD HH24MISS");
console.log(folder);
var fswrite = require("fs");
var temp = "";
var index = 0;

var index2 = 0;

var data = []
var data2 = [];
var datar;

function func(line, end) {  


    if (line.trim() != "") {
        data.push(line.trim());
        //console.log(line);  
        index++
    }
    if (end == "end") {

        //console.log(data);
        console.log("end1");
        //console.log(data);
        console.log(index);

        readLines(input2, func2);

    }

} 

var str = "";

function func2(line, end) {
    //console.log(line);
    if (line.trim() != "") {
        data2.push(line.trim());

    }
    if (end == "end") {
        //console.log(data2);
        console.log("end2" + index2);

        for (var i = data2.length - 1; i >= 0; i--) {

            for (var j = data.length - 1; j >= 0; j--) {
                if(data2[i].indexOf(data[j])>0){
                    console.log(index2++);
                    str += data2[i] + "\r\n";
                }
            }

        }
        var fs1 = require("fs")
         fs1.writeFile(path.join(__dirname, "result.json"), str, function(err) {
                if (err) {
                    console.log(err);
                }else{
                    console.log("ok");
                }

            });
            
        
    }
}
