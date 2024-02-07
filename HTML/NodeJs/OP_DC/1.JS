var sum = 1;
var alldata = [];
var mydata = {};

function travel(dir, callback) {
    const fs = require('fs')
    var path = require("path")
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            if (pathname.indexOf(".xml") > 0) {
                callback(pathname);
            }

        }
    });
}


var sum= 0;

function readfile(path) {

    //导入fs模块
    const fs = require('fs')
    //console.log(path)

    fs.stat(path, (err, stat) => {
        if (err) {
            console.log(err);
            return
        } else {
            //console.log(stat);
            //stat.size :文件的大小（以字节为单位)
            //stat.mtime:表明上次更改文件时间; birthtime:文件创建时间
            //isFile():是否是文件； isDirectory()：是否是目录；
            //console.log(`size:${stat.size}  mtime:${stat.mtime}  isFile:${stat.isFile()}  birthtime：${stat.birthtime}          isdir: ${stat.isDirectory()}`);
            //console.log(stat);
            var file = {name:path,mtime:stat.mtime};
            alldata.push(file);
            //console.log(file);
            console.log(`sum = ${++sum}`);
            if(sum == 84)
            {
                console.log("finished.")  
                function sortRule(a,b) {
                  return a.mtime-b.mtime; // 如果a>=b，返回自然数，不用交换位置
                }
                alldata.sort(sortRule);
                //console.log(alldata);
                for(var index =0;index<alldata.length;index++)
                {
                    console.log(`${alldata[index].mtime} ${alldata[index].name}`)
                }

            }





        }
    })


    fs.readFile(path, 'utf-8', function(err, data) {
        //打印失败
        if (err) {
            console.log(err);
        } else {
            //console.log(data);

        }
    })
}


travel("D:\\2022\\DC OP合版本\\MPC\\187", readfile);



