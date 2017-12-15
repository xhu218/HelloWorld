var path = require("path");
var file = require("./fileHelper.js");
var writelog = require("./writelog.js");
var fund_stock = require("./fund_mysql.js")
require('date-utils');


fund_stock = {


    getalltheinfo: function() {



        var dt = new Date().addHours(-24);;
        var filename = dt.toFormat("YYYY-MM-DD");

        var alljjlisturl = "http://xhu219.s3.91sc.top/data/" + filename + ".json";

        var total = 3665;
        //var total = 20;
        var current = 0;


        var req1 = require('request');


        req1(alljjlisturl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                var jj = body.replace("var good =", "");
                var jjObjs = JSON.parse(jj);

                //console.log(jjObjs);

                for (var i = 0; i < jjObjs.length; i++) {
                    /*
                    if (i >= total) {
                        break;
                    }
                    */
                    setTimeout(

                        ((function(jijing_Code, jijing_Name) {
                            return function() {

                                try {

                                    var url = "http://fund.eastmoney.com/" + jijing_Code + ".html?spm=search&t=" + Math.random();
                                    var request = require('request');
                                    request(url, function(error, response, body) {

                                        try {

                                            if (!error && response.statusCode == 200) {
                                                current++;
                                                console.log(current + "\t" + url);

                                                doit(jijing_Code, jijing_Name, body, function(jijing_Code, item) {


                                                    fund_mysql.insert_fund_stocks(item);
                                                    if (current == total) {
                                                        console.log("我已经做完所有的事情了");
                                                    }
                                                });

                                            } else {
                                                current++;
                                                writelog(url + "出错了", "Error");
                                            }
                                        } catch (err) {

                                            writelog("doit method failed " + err + jijing_Code, "Error");
                                        }

                                    });
                                } catch (err) {
                                    writelog("request error " + jijing_Code + err, "Error");
                                }
                            }

                        })(jjObjs[i].jijing_Code, jjObjs[i].jijing_Name)), i * 200);
                }
            }
            else{
                writelog("get all the jjlist failed.");
            }
        });


        function doit(jijing_Code, jijing_Name, content, callback) {

            //console.log(content);

            try {
                var regTab = /<li class=\'position_shares\' id=\'position_shares\'[\s\S]*?<\/li>/gi;

                var regTr = /<tr>[\s\S]*?<\/tr>/g;




                //var regTdName = /<td class=\"alignLeft\">   <a href=[^>]*>([\S]*?)<\/a>  <\/td> <td class=\"alignRight bold\">(.*?)<\/td>  <td class=\"alignRight bold\" stockcode=\"(.*?)\"><span class=[^>]*?>(.*?)<\/span>  <\/td>/g
                var regTdName = /<td class=\"alignLeft\">   <a href=[^>]*>([\S]*?)<\/a>  <\/td>  <td class=\"alignRight bold\">(.*?)<\/td>  <td class=\"alignRight bold\" stockcode=\"(.*?)\"><span class=[^>]*?>(.*?)<\/span>  <\/td>/g
                //var regTdName =   /<td class=\"alignLeft\">   <a href=[^>]*>([\S]*?)<\/a>  <\/td>  <td class=\"alignRight bold\">(.*?)<\/td>  <td class=\"alignRight bold\" stockcode=\"\(.*?)\"><span class=[^>]*?>(.*?)<\/span>  <\/td>/g
                var data = regTab.exec(content);


                var jj = { "jijing_Code": jijing_Code, "jijing_Name": jijing_Name, "Stocks": [] };

                while (tr = regTr.exec(data[0])) {
                    //console.log(tr[0]);

                    while (td = regTdName.exec(tr[0])) {
                        //console.log(td);
                        // console.log(td[1], td[2], td[3].replace("stock_", ""), td[4]);


                        jj.Stocks.push({ "StockCode": td[3].replace("stock_", ""), "StockName": td[1], "HowMany": td[2], "Increase": td[4].replace("--", 0.0) });

                    }
                }

                if (typeof callback == "function") {

                    callback(jijing_Code, [jj]);
                }
            } catch (err) {

                writelog("doit method " + jijing_Code + err, "Error")
            }

        }


    }






}

module.exports = fund_stock;





//var filecontent = file.readfromFile("wfg.html");
//doit("121", "12", filecontent, null);