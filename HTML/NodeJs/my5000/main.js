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


var input = fs.createReadStream(path.join(__dirname, file));
readLines(input, func);

var doingIndex = 0;
var totalline = 0;
var alldata = [];

function func(line) {  

    alldata.push(line);
    totalline++;
    writelog("enqueue . " + totalline + "/" + alldata.length);
} 


var myInterval = setInterval(anlysis, 1000, "Interval");;


function anlysis() {


    try {

        if (alldata.length = totalline) {

            var data = alldata[doingIndex++];
            writelog("Current do " + doingIndex + " / " + totalline + "   " + alldata.length + " -" + data);

            var arr = data.split(",");

            var _no = arr[0];
            var _type = basemethod.filter(basemethod.trim(arr[1]));


            var parentFolder = path.join(__dirname, "Image2", _type);
            if (!fs.existsSync(parentFolder)) {
                writelog("创建目录：" + parentFolder);
                fs.mkdirSync(parentFolder);
            }

            var url = "http://app.fromfactory.club:8000/product_list?q=" + _no;


            writelog(">>>> access to  " + url + "\t" + _no);

            request({
                url: url,
                json: false,

            }, function(error, response, users) {
                if (!error && response.statusCode === 200) {


                    try {


                        var str = users;
                        var reg = /data-src=[^\s]*/;
                        var res = str.match(reg);
                        var imageurl = res[0].replace("data-src=", "").replace(/"/g, "");


                        var reg1 = /data-product-no=[^\s]*/;
                        var res1 = str.match(reg1);
                        var no = res1[0].replace("data-product-no=", "").replace(/"/g, "");

                        var reg2 = /<img id=[^\s]*/;
                        var res2 = str.match(reg2);
                        var imgid = res2[0].replace("<img id=", "").replace(/"/g, "").replace("img_", "");

                        writelog("no = " + no + "imageurl =  " + imageurl + "imgid = " + imgid);

                        if (imageurl == null || no == null) {
                            writelog("网页里没有找到对应的项" + data);
                            return;
                        }

                        if (_no == no) {
                            var index = imageurl.lastIndexOf(".");
                            var ext = imageurl.substring(index);

                            downloadPic(imageurl, path.join(parentFolder, no + ext));

                            downloadinfo(_no, imgid);

                        } else {
                            writelog("网址地址与网页内容里ID对不上 _no = " + _no + " no = " + no + "   " + data + "    " + url, "Error");
                        }
                    } catch (err) {
                        writelog("函数处理出异常 " + err + data + "    " + url, "Error");
                    }

                } else {
                    writelog("HTTP状态码出问题 " + data + "    " + url);
                }
                anlysisresult();

            });


        }
    } catch (error) {
        anlysisresult();
        writelog("函数处理出异常 " + error + data + "    " + url, "Error");
    }
}

var content = "";

function anlysisresult() {

    if (doingIndex % 100 == 0) {
        fileHelper.writetoFile(content, path.join(__dirname, file + ".txt"), true);
    }

    if (doingIndex > totalline - 1) {

        clearInterval(myInterval);

    } else {

        anlysis();
       
    }

}

function downloadinfo(no, imaid) {

    writelog("start download" + no + imaid);
    var url = "http://app.fromfactory.club:8000/product/" + imaid + "?t=Search&p=1&q=" + no;
    writelog(url);

    writelog(">>>>>>>>>>>>>>>access to  " + no + "\t" + imaid);

    request({
        url: url,
        json: false,

    }, function(error, response, users) {

        try {
            users = users.replace(/\r\n/g, "").replace(/\n/g, "");

            var reg1 = /<h6 itemprop=\"name\">.*?<\/h6>/m;
            var res1 = users.match(reg1);
            writelog(no + res1[0] + "\n");
            content += no + res1[0] + "\n";


        } catch (err) {
            writelog(no + imaid + err, "Error");
        }

    })
}

function downloadPic(src, dest, retryCount) {
    //todo先判断目录文件是否存在，如果存在，则不进行下面的逻辑
    try {
        if (!fs.existsSync(dest)) {
            request(src).pipe(fs.createWriteStream(dest)).on('close', function() {

                fs.stat(path.join(dest), function(err, stats) {
                    if (err) {
                        writelog(err, "Error");

                        if (retryCount === undefined) { retryCount = 0; }
                        if (retryCount < 5) {
                            downloadPic(src, dest, retryCount++)
                        }

                    } else {
                        //console.log(stats);
                        if (stats.size < 1000) {
                            if (retryCount === undefined) { retryCount = 0; }
                            if (retryCount < 5) {
                                downloadPic(src, dest, retryCount++)
                            }

                        }
                    }
                })

                writelog("<<<<" + dest)
            })
        } else {
            writelog("Warning Warning 这个文件已经存在了   " + dest);

        }
    } catch (err) {
        writelog(err, "Error");
        if (retryCount === undefined) { retryCount = 0; }
        if (retryCount < 5) {
            downloadPic(src, dest, retryCount++)
        }
    }
}



writelog("end...");