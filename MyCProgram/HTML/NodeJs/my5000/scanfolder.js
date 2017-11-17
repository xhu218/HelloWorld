/**打描文件/


var arguments = process.argv.splice(3);
console.log('所传递的参数是：', arguments);




/*
function  myfunc(Interval){
    console.log("myfunc  "+Interval);
}
var myInterval=setInterval(myfunc,1000,"Interval");
*/


var fs = require("fs")
require('date-utils');
var path = require("path")

var root = path.join(__dirname + "\\image2")

console.log("start...");
var result = "";
readDirSync(root)
console.log("end...");



function readDirSync(filepath) {
    var pa = fs.readdirSync(filepath);
    pa.forEach(function(ele, index) {
        var info = fs.statSync(filepath + "\\" + ele)
        if (info.isDirectory()) {
            //console.log("dir: " + ele)
            readDirSync(filepath + "\\" + ele);
        } else {
            var curPath = filepath + "\\" + ele;

            var type = path.resolve(curPath, "..").replace(root + "\\", "");
            var folder = curPath.replace(path.resolve(filepath, ".."));

            console.log(ele, ",", type);
            result += ele + "," + type + "\n";

        }
    })
}

writetofile(null);
console.log("i have finised....");

function writetofile(content) {
    var dt = new Date();
    var folder = dt.toFormat("YYYYMMDD");

    fs.writeFile(path.join(__dirname, "data", folder, dt.toFormat("HH24MISS") + "scanfolder.txt"), result, function(err) {
        if (err) {
            console.log("fail" + err)
        } else {
            console.log("写入文件成功 : " + content);
        }

    });
}