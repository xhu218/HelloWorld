/*
得出低质量的所有类别
根据DIR命 令的处理
*/

var fs = require("fs");
var path = require("path");
var readLines = require("./readline.js");

//var input = fs.createReadStream("a:\\20171220 153407.txt");
var input = fs.createReadStream("C:\\Users\\WangFugui\\Desktop\\file\\file.txt");
readLines(input, func);
require('date-utils');


var dt = new Date();
var folder = dt.toFormat("YYYYMMDD HH24MISS");
console.log(folder);
var fswrite = require("fs");
var temp = "";
var index = 0;

var data = {};

function func(line, end) {  

    if (line.trim() != "" &&
        line.indexOf("File(s)") < 0 &&
        line.indexOf("    <DIR>          ") < 0 &&
        line.indexOf("Directory of ") < 0) {

        line = line.replace(/,/g, "");
        line = line.replace(/\d{2}\/\d{2}\/\d{4}  \d{2}:\d{2}\W*/, "");
        line = line.replace(" ", "\t");



        if (line.trim() != "") {
            line = line.trim();
            //line = line.replace(/\t.*\.MP3/gi, "\t.mp3");
            //line = line.replace(/(.*)\t.*\.(.*)$/gi, "$1\t$2");
            //console.log(line);
            var d = line.split("\t");

            //console.log(d);
            if (d[0] !== null && d[1] != null) {

                var key = d[1].toUpperCase();
                var val = parseInt(d[0]);
                if (data[key] != null) {
                    data[key] = data[key] + 1;
                } else {
                    data[key] = 1;
                }
            }

            line = line.trim();
            temp += line + "\n";
        }

        if (index++ % 5000 == 0 || end == "end") {
            var t = temp;
            //console.log(t);

            console.log(index, end);
            fs.appendFile(path.join(__dirname, folder + ".txt"), t, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            temp = "";
            if (end == "end") {
                console.log("文件写完了哈");
            }

        }
        if (end == "end") {
            //console.log(data);
            var fs1 = require("fs");
            var data1 = {};
            for (var a in data) {
                if (parseInt(data[a]) > 1) {
                    console.log(data[a]);
                    data1[a] = data[a];
                }

            }

            fs1.writeFile(path.join(__dirname, "result.json"), JSON.stringify(data1), function(err) {
                if (err) {
                    console.log(err);
                }

            });
        }
    }

} 