var fs = require("fs");
require("date-utils");

//path模块，可以生产相对和绝对路径
var path = require("path");

//配置远程路径
var remotePath = "/resource/fd/promote/201507/qixi/";

//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.join(__dirname, "files1");

//读取文件存储数组
var fileArr = [];

var doingcount = 0;

function GetAllTheFiles(root) {
    //读取文件目录
    fs.readdir(root, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(root, files[i]);

            fs.stat(filename, function(err, stats) {
                if (err) throw err;
                //console.log(new Date());
                 console.log(filename);
                if (stats.isFile()) {

                    if (getdir(filename) == 'mp3' || getdir(filename) == "mp4" || getdir(filename) == "avi") {
                        //console.log(filename);
                        fileArr.push(filename);

                        writeFile(fileArr);


                    }

                } else if (stats.isDirectory()) {
                    GetAllTheFiles(filename);
                }
            });
        }




    });
}


//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}



// 写入到filelisttxt文件
function writeFile(data) {
    var data = data.join("\n");
    fs.writeFile(path.join(__dirname, "filelist.txt"), data + '\n', function(err) {
        if (err) throw err;
        console.log("写入成功");
    });
}

GetAllTheFiles(filePath);