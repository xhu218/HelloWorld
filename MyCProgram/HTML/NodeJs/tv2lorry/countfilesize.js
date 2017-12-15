var fs = require("fs");
require("date-utils");

//path模块，可以生产相对和绝对路径
var path = require("path");

//配置远程路径
var remotePath = "/resource/fd/promote/201507/qixi/";

//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.join(__dirname, "files");

//读取文件存储数组
var fileArr = [];

var doingcount = 0;
var size = 0;

function GetAllTheFiles(root) {
    //读取文件目录
    var fs1 = require("fs");
    fs1.readdir(root, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(root, files[i]);
           
            var fs2 = require("fs");

            (function(filename) {

                    fs2.stat(filename, function(err, stats) {
                        if (err) throw err;
                       

                        if (stats.isFile()) {
                            

                            
                            if (getdir(filename) == "mp3" || getdir(filename) == "mp4" || getdir(filename) == "avi") {
                                //console.log(filename,stats.size);
                                size = size+stats.size
                                console.log(size);


                                //writeFile(fileArr);


                            }

                        } else if (stats.isDirectory()) {
                            //console.log("wfg", filename);
                            GetAllTheFiles(filename);
                        }
                    })

                }

            )(filename);


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