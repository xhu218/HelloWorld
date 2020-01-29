var request = require('request');
var fund_mysql = require("./fund_mysql.js");

/*
获取所有基金的评论
*/
async function test2() {


    fund_mysql.getAllFundCode(async function(r) {

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
                            console.warn(`[autoRetry] Catched error when ${funcName}() : ${err.message}. Retry ${retryNum} time...`);
                            resolve(funcR(...params));
                        } else {
                            reject(err);
                        }
                    });
                });
            };
        };

        function insert2(fund_code,url) {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {

                        var options = {
                            'method': 'GET',
                            'url': url, //http://guba.eastmoney.com/list,of519674.html
                            'headers': {}
                        };


                        request(options, function(error, response) {
                            if (error) reject(url);
                            //console.log(response.body);
                            var content = response.body;
                            var res = content.match(/<div class="articleh([\s\S]*?)<\/div>/g);
                            //console.log(res)
                            if (res != null) {
                                console.log("-------------------------------------------------------------")
                                res.forEach(function(item, index) {
                                    //console.log(item);
                                    //读
                                    var i = item.match(/<span class="l1">[\s\S].*?<\/span>/g);
                                    var read = i[0].replace(/<[^>]+>/g, "");

                                    //写
                                    var i = item.match(/<span class="l2">[\s\S].*?<\/span>/g);
                                    var write = i[0].replace(/<[^>]+>/g, "");
                                    //作者
                                    var i = item.match(/<span class="l3">[\s\S].*?<\/span>/g);
                                    var content = i[0].replace(/<[^>]+>/g, "");

                                    //内容
                                    var i = item.match(/<span class="l4">[\s\S].*?<\/span>/g);
                                    var author = i[0].replace(/<[^>]+>/g, "");
                                    //时间
                                    var i = item.match(/<span class="l5">[\s\S].*?<\/span>/g);
                                    var time = i[0].replace(/<[^>]+>/g, "");


                                    //[item.id,item.read,item.write,item,author,item.content,item.time];
                                    var item = { "id": fund_code, "read": read, "write": write, "author": author, "content": content, "time": '2020-' + time };
                                    console.log(item);
                                    fund_mysql.insert1(item,function(err,result){resolve(url)});
                                    
                                    //resolve(url);

                                })
                            }
                        });

                    } catch (err) {
                        return reject(err);
                    }
                }, 10);
            })
        };

        insert2 = autoRetry(insert2, 3);

        //http://guba.eastmoney.com/list,of519674.html
        for (var i = r.length - 1; i >= 0; i--) {
            //console.log(r[i].FUND_CODE);
            var url = "http://guba.eastmoney.com/list,of" + r[i].FUND_CODE + ".html";
            console.log(url);
            await insert2(r[i].FUND_CODE,url);
        }

    });
}

test2();