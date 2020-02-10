var path = require("path");
var file = require("./fileHelper.js");
var writelog = require("./writelog.js");
var fund_stock = require("./fund_mysql.js")
var jijingbase = require("./jijingbase.js")
/*
获取所有基金的股票占用情况
*/


var fund_stock = {


    getalltheinfo: function() {
        fund_mysql.getAllFundCode(async function(r) {
			
			console.log(r.length);
            var async = require("async");

            var fund_codes = [];
            var currentCount = 0;

            //fund_codes.push("000148");
            //fund_codes.push("000149")
            
            for (var i = r.length - 1; i >= 0; i--) {
                fund_codes.push(r[i].FUND_CODE);
            }          

            var index = 0;
            async.mapLimit(fund_codes, 5, function(fund_code, callback) {
                var delay = parseInt(1000);
                currentCount++;
                //console.log("currentCount is :" + currentCount + ",current fund code is :" + fund_code + ",use time is :" + delay + " mm");
                setTimeout(function() {


                    function foo(param) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                try {



                                    var request = require('request');
                                    var url = "http://fund.eastmoney.com/" + param + ".html?spm=search&t=" + Math.random();

                                    console.log(`url = ${url}`);

                                    url = jijingbase.encode(url)

                                    var options = {
                                        'method': 'GET',
                                        'url': 'http://91sc.top/redirect.php',
                                        'headers': {
                                            'url': url
                                        }
                                    };

                                    console.log(`url = ${url}`);
                                    request(options, function(error, response, body) {

                                        if(error){
                                            writelog(error+url,"Error");
                                            return reject(param);
                                        }

                                        var arry = body.split('').reverse();

                                        var mima = "mynameiswfgwhatisyourname";
                                        var p1 = mima.split("")
                                        for (var i = p1.length * 2 - 1; i >= 0; i = i - 2) {
                                            arry[i] = "";
                                        }

                                        body = new Buffer(arry.join(""), 'base64').toString();


                                        currentCount--;
                                

                                        var regTab = /<li class=\'position_shares\' id=\'position_shares\' style=\'display:block\' >[\s\S]*?<\/li>/gi;
                                        var data = regTab.exec(body);
                                        //console.log(body);
                                        if (data != null) {
                                            console.log(fund_code);
                                            //console.log(data[0]);
                                            var dt = new Date();
                                            var line = dt.toFormat("YYYY-MM-DD")
											var path1 = path.parse(__dirname);
											//console.log(path1.root);
                                            var filename = path.join(path1.root, "Data", line, fund_code + ".xml");
                                            var fs = require("fs");
                                            if (!fs.existsSync(path.join("e:", "Data", line))) {
                                                fs.mkdirSync(path.join("e:", "Data", line));
                                            }

                                            //console.log(data[0]);


                                            file.writetoFile((data[0]), filename, false, function() {
                                                console.log(`${index++} / ${r.length}`);
                                                return resolve(param);

                                            });
                                        } else {
                                            writelog(url + 'not find matched cotent', "Error");
                                            return reject(param);
                                        }
                                    })

                                } catch (err) {
                                     writelog(url + 'not find matched cotent', "Error");
                                    return reject(param);
                                }
                            }, 1000);
                        })
                    }

                    /**
                     * 包裹方法，使其自动错误重试
                     * 只能包裹返回Promise的方法
                     * 返回promise，可以获取成功的返回值，或最后失败的err
                     * 需要运行环境支持ES6的Promise语法，或者使用Bluebird库
                     * @param func
                     * @param retryMax
                     * @returns {funcR}
                     */
                    function autoRetry(func, retryMax) {
                        retryNum = 0;
                        let funcName = func.toString().match(/function (\w+)\(/)[1];
                        return funcR = function() {
                            let params = arguments;
                            return new Promise((resolve, reject) => {
                                func(...params).then(result => {
                                    resolve(result);
                                }).catch(err => {
                                    if (retryNum < retryMax) {
                                        retryNum++;
                                        console.warn(`[autoRetry] Catched error when ${funcName}() : ${err}. Retry ${retryNum} time...`);
                                        resolve(funcR(...params));
                                    } else {
                                        reject(err);
                                    }
                                });
                            });
                        };
                    }


                    // 使用autoRetry()包裹方法，并给出最大重试次数（执行数=重试次数+1）
                    var foo1 = autoRetry(foo, 20);

                    //test1();

                    // 执行并获取结果/捕获错误
                    foo1(fund_code)
                        .then(r => {
                            //console.log('成功返回：');
                            //console.log(r)
                            callback(null, fund_code + ' html content ');

                        })
                        .catch(e => {
                            console.log('最后错误：');
                            console.log(e);
                            writelog(`http://fund.eastmoney.com/${fund_code}.html?spm=search not get the detail`, "Error")
                            callback(null, fund_code + ' html content ');
                        });




                }, delay);

            }, function(err, result) {
                console.log("result:");
                console.log(result);
            });


        });
    }
}

module.exports = fund_stock;