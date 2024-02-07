/*find it in 3 db*/


/*

input args   <== data/20171112/notfind.txt

*/

var fs = require("fs");
var arguments = process.argv.splice(2);
require('date-utils');
var file = arguments[0];

console.log(file);





var writelog = require("./writelog.js");
var fileHelper = require("./fileHelper.js");
var path = require("path");
var readLines = require("./readline.js");


console.log("start...");


var input = fs.createReadStream(path.join(__dirname, file));
readLines(input, func);


var list = [];
var result = new Array();
var currentStartIndex = 0;
var currentFinishIndex = 0;


function func(line) {


    var arr = line.split(",");

    var no = arr[0];
    var type = arr[1].replace("\r", "").replace("?", "");

    result[no] = { "no": no, "type": type, "title": null };
    list.push({ "no": no, "type": type, "title": null });
    //console.log(">>>>>>>>>" + incount++ + "\t" + line);
}


var myInterval = setInterval(anlysiss, 3000, "Interval");;




function anlysiss() {
    anlysis();
    anlysis();
    anlysis();
    
   
}

function anlysis() {

    if (currentStartIndex < list.length) {
        var data = list[currentStartIndex];

        www(data);

        currentStartIndex++;
    } else {
        clearInterval(myInterval);
        // writelog("i have finised...");
    }
}

function funresult(item_no, title) {
    var split = "|";
    currentFinishIndex++;
    writelog(currentFinishIndex + "                  " + item_no);
    result[item_no].title = title;

    if (currentFinishIndex % 20 == 0 || currentFinishIndex == list.length) {
        var content = "";
        for (var x = 0; x < list.length; x++) {

            content = result[list[x]].no + split + result[list[x]].type + split + result[list[x]].title + "\n";

            fileHelper.writetoFile(content, path.join(__dirname, file + ".json"), false);
        }
    }
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


function www(data) {

    var request = require("request");

    var item_no = data.no;

    var options = {
        method: 'GET',
        url: 'http://www.yuceyi.com:9999/purchase_order/complete/list/',
        json: true,
        qs: {
            offset: '0',
            limit: '20',
            ordering: '',
            stock_keep_unit__product__item_no: data.no,
        },
        headers: {
            'postman-token': 'd5261416-ad63-e26f-63e2-6191b4204391',
            'cache-control': 'no-cache',
            cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0; warehouse=xiaoshan',
            'accept-language': 'zh-CN,zh;q=0.8',
            'accept-encoding': 'gzip, deflate',
            referer: 'http://www.yuceyi.com:9999/web',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0',
            'x-requested-with': 'XMLHttpRequest',
            accept: 'application/json, text/javascript, */*; q=0.01'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            writelog(item_no + "www " + error,"Error");
            xs(data);
        }
        //console.log(body);
        console.log("-----------------------------------------------------------");
        try {
            //console.log(body.count);
            if (body.count > 0) {


                var image_url = body.results[0].stock_keep_unit.product.sku_image_url;
                var title = body.results[0].stock_keep_unit.sku_title;

                funresult(item_no, title);
                if (image_url.indexOf(".jpg") > 0) {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".jpg");
                } else {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".png");
                }



                //console.log(title, image_url);

                return;
            } else {
                xs(data);
            }
        } catch (err) {

            writelog(item_no + "www " + error,"Error");
            xs(data);
        }


    });
}


function xs(data) {
    var request = require("request");

    var item_no = data.no;
    var options = {
        method: 'GET',
        url: 'http://xs.yuceyi.com/purchase_order/complete/list/',
        json: true,
        qs: {
            offset: '0',
            limit: '20',
            ordering: '',
            stock_keep_unit__product__item_no: item_no
        },
        headers: {
            'postman-token': 'ffaec5bf-0cda-11de-0f27-05295322b966',
            'cache-control': 'no-cache',
            cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0; warehouse=xiaoshan',
            'accept-language': 'zh-CN,zh;q=0.8',
            'accept-encoding': 'gzip, deflate',
            referer: 'http://xs.yuceyi.com/web',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0',
            'x-requested-with': 'XMLHttpRequest',
            accept: 'application/json, text/javascript, */*; q=0.01'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            writelog(item_no + "xs " + error,"Error");
            hn(item_no);
        }
        //console.log(body);
        //console.log("-----------------------------------------------------------");
        try {
            //console.log(body.count);
            if (body.count > 0) {


                var image_url = body.results[0].stock_keep_unit.product.sku_image_url;
                var title = body.results[0].stock_keep_unit.sku_title;

                funresult(item_no, title);
                if (image_url.indexOf(".jpg") > 0) {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".jpg");
                } else {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".png");
                }


                //console.log(title, image_url);

                return;


            } else {
                hn(data);
            }
        } catch (err) {

            writelog(item_no + "xs " + error,"Error");
            hn(data);
        }
    });
}


function hn(data) {


    var request = require("request");
    var item_no = data.no;

    var options = {
        method: 'GET',
        url: 'http://hn.yuceyi.com/purchase_order/complete/list/',
        json: true,
        qs: {
            offset: '0',
            limit: '20',
            ordering: '',
            stock_keep_unit__product__item_no: item_no
        },
        headers: {
            'postman-token': '5dbb59ed-da14-252d-e0b7-bdd02e829666',
            'cache-control': 'no-cache',
            cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0; warehouse=xiaoshan',
            'accept-language': 'zh-CN,zh;q=0.8',
            'accept-encoding': 'gzip, deflate',
            referer: 'http://hn.yuceyi.com/web',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0',
            'x-requested-with': 'XMLHttpRequest',
            accept: 'application/json, text/javascript, */*; q=0.01'
        }
    };


    request(options, function(error, response, body) {
        if (error) {
            writelog(item_no + "xs " + error,"Error");
            hn(item_no);
        }
        //console.log(body);
        console.log("-----------------------------------------------------------");
        try {
            // console.log(body.count);
            if (body.count > 0) {


                var image_url = body.results[0].stock_keep_unit.product.sku_image_url;
                var title = body.results[0].stock_keep_unit.sku_title;

                funresult(item_no, title);
                if (image_url.indexOf(".jpg") > 0) {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".jpg");
                } else {
                    downloadPic(image_url, __dirname + "\\image2\\" + data.type + "\\" + item_no + ".png");
                }


                //console.log(title, image_url);

                return;


            } else {
                funresult(item_no, "not find...");
            }
        } catch (err) {

            writelog(item_no + "xs " + error,"Error");
            funresult(item_no, "not find ...");
            //hn(item_no);
        }

    });

}