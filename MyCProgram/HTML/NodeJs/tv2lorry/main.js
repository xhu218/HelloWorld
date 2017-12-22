var fs = require("fs");
var readLines = require("./readline.js");

//var input = fs.createReadStream("a:\\20171220 153407.txt");
var input = fs.createReadStream("a:\\20171220 153408.txt");
readLines(input, func);
require('date-utils');


var dt = new Date();
var folder = dt.toFormat("YYYYMMDD HH24MISS");
console.log(folder);
var fswrite = require("fs");
var temp = "";
var index = 0;

function func(line, end) {  

    if (line.trim() != "" && line.indexOf("File(s)") < 0) {

        line = line.replace(/,/g,"");
        //line = line.replace(/\d{2}\/\d{2}\/\d{4}  \d{2}:\d{2}\W*/,"");
        line = line.replace(" ","\t");

        if(end == "end"){
        	console.log("end");
        }

        if (line.trim() != "") {
        	line = line.trim();
            //line = line.replace(/\t.*\.MP3/gi, "\t.mp3");
          	line = line.replace(/(.*)\t.*\.(.*)$/gi,"$1 \t $2");
          	//console.log(line);

            line = line.trim();
            temp += line + "\n";
        }

        if (index++ % 100 == 0 || end == "end") {
            var t = temp;
            //console.log(t);

            console.log(index, end);
            fs.appendFile("a:\\" + folder + ".txt", t);
            temp = "";
            if (end == "end") {
                console.log("文件写完了哈");
            }

        }
    }

} 