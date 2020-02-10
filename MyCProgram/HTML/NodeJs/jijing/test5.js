/*
测试程序
*/

var async = require("async");
var currentCount = 0;
console.log("will create a url list size 10 !");
var urls = [];
for (var i = 0; i < 4; i++) {
    urls.push('http://www.example.com/' + i + ".html");
}
async.mapLimit(urls, 2, function(url, callback) {
    var delay = parseInt(500);
    currentCount++;
    console.log("currentCount is :" + currentCount + ",current url is :" + url + ",use time is :" + delay + " mm");
    setTimeout(function() {
        currentCount--;
        /*
        测试程序
        */

        function foo(param) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        JSON.parse('{'); // 执行到这里会报错

                        return resolve(param);

                    } catch (err) {
                        return reject(err);
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
                            console.warn(`[autoRetry] Catched error when ${funcName}() : ${err.message}. Retry ${retryNum} time...`);
                            resolve(funcR(...params));
                        } else {
                            reject(err);
                        }
                    });
                });
            };
        }


        // 使用autoRetry()包裹方法，并给出最大重试次数（执行数=重试次数+1）
        var foo1 = autoRetry(foo, 3);

        //test1();

        // 执行并获取结果/捕获错误
        foo1(url)
            .then(r => {
                console.log('成功返回：');
                console.log(r)
                callback(null, url + ' html content ');

            })
            .catch(e => {
                console.log('最后错误：');
                console.log(e)
                 callback(null, url + ' html content ');
            });

       

    }, delay);
}, function(err, result) {
    console.log("result:");
    console.log(result);
});