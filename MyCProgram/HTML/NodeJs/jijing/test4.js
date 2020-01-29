var path = require("path");
var file = require("./fileHelper.js");
var writelog = require("./writelog.js");
var fund_stock = require("./fund_mysql.js")

/*
获取所有基金的股票占用情况
*/


var fund_stock = {


    getalltheinfo: function() {
        fund_mysql.getAllFundCode(async function(r) {

            var async = require("async");

            var fund_codes = [];
            var currentCount = 0;
            for (var i = r.length - 1; i >= 0; i--) {               
                fund_codes.push(r[i].FUND_CODE);
            }

            async.mapLimit(fund_codes, 10, function(fund_code, callback) {
                var delay = parseInt(1);
                currentCount++;
                console.log("currentCount is :" + currentCount + ",current fund code is :" + fund_code + ",use time is :" + delay + " mm");
                setTimeout(function() {

                    var request = require('request');
                    var url = "http://fund.eastmoney.com/" + fund_code + ".html?spm=search&t=" + Math.random();
                    request(url, function(error, response, body) {


                        currentCount--;
                        if(error){
                             callback(null, url + 'failed to get the url content');
                             return;
                        }

                        var regTab = /<li class=\'position_shares\' id=\'position_shares\' style=\'display:block\' >[\s\S]*?<\/li>/gi;
                        var data = regTab.exec(body);
                        //console.log(body);
                        if (data != null)
                         {
                            console.log(fund_code);
                            //console.log(data[0]);
                            var dt = new Date();
                            var line = dt.toFormat("YYYY-MM-DD")
                            var filename = path.join(__dirname, "Data", line, fund_code + ".xml");
                            var fs = require("fs");
                            if (!fs.existsSync(path.resolve("Data", line))) {
                                fs.mkdirSync(path.resolve("Data", line));
                            }
                            file.writetoFile(data[0], filename, false, function() {
                                callback(null, url + ' html content ');
                            });
                        }
                        
                        else{
                              callback(null, url + 'not find matched cotent');
                        }
                        
                    })

                }, delay);

            }, function(err, result) {
                console.log("result:");
                console.log(result);
            });      


        });
    }
}

module.exports = fund_stock;