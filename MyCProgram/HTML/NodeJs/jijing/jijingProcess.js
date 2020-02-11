var request1 = require("./request.js");
require('date-utils');
var config = require("./config.js")
var writelog = require("./writelog.js");



var jijingProcess = {

    download: function() {
        try {


            var dt = new Date();
            var d = dt.toFormat("YYYY-MM-DD");
            console.log(d);

            var allpages = 6; //;

            var pagenum = 1000;

            //pagenum = 30;

            var alldata = [];

            var alllist = [];

            var doingCount = 0;

            var top = 200;



            for (var index = 1; index <= allpages; index++) {

                var tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=zzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=" + pagenum + "&dx=1&v=" + Math.random();
                tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=zzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=" + pagenum + "&dx=1&v=" + Math.random();
                var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=74&pn=50&dx=1&v=0.005266926352829326";
                //console.log(url);

                setTimeout((function(t) {
                    return function() {
                        //console.log(t);
                        var request = require('request');
                        var url = t;

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

                            if (error) {
                                writelog(error + url, "Error");

                            }

                            var arry = body.split('').reverse();

                            var mima = "mynameiswfgwhatisyourname";
                            var p1 = mima.split("")
                            for (var i = p1.length * 2 - 1; i >= 0; i = i - 2) {
                                arry[i] = "";
                            }

                            body = new Buffer(arry.join(""), 'base64').toString();


                            doingCount++;
                            console.log(doingCount + "    " + t);
                           
                            content = body;
                            if (content == null) {
                                writelog(url + "content is null", "Error")
                                return;
                            }
                            // console.log(content);
                            //console.log(data);
                            //console.log("current page : " + url);
                            var data = content.replace("var rankData = ", "").replace("};", "}");
                            //console.log(data);
                            var o = eval("(" + data + ")");
                            console.log("allRecords :" + o.allRecords + " pageIndex : " + o.pageIndex + " pageNum : " + o.pageNum, " allPages : " + o.allPages);

                            alldata = alldata.concat(o.datas);

                            //如果中间有一个网页请求失败，那么就不发请
                            if (doingCount == allpages) {

                                for (var i = 0; i < alldata.length; i++) {

                                    var obj = alldata[i].split(",");
                                    var data = {

                                        jijing_Code: obj[0],
                                        jijing_Name: obj[1],
                                        jijing_Mask: obj[74],
                                        jijing_Date: obj[3],
                                        jijing_unitValue: obj[4] == "" ? 0 : parseFloat(obj[4]),
                                        jijing_totalValue: obj[5] == "" ? 0 : parseFloat(obj[5]),
                                        jijing_daliyIncreaseRate: obj[6] == "" ? 0 : parseFloat(obj[6]),
                                        jijing_lastWeek: obj[7] == "" ? 0 : parseFloat((obj[7])),
                                        jijing_lastMonth: obj[8] == "" ? 0 : parseFloat((obj[8])),
                                        jijing_last3Month: obj[9] == "" ? 0 : parseFloat((obj[9])),
                                        jijing_last6Month: obj[10] == "" ? 0 : parseFloat((obj[10])),
                                        jijing_last1year: obj[11] == "" ? 0 : parseFloat((obj[11])),
                                        jijing_last2year: obj[12] == "" ? 0 : parseFloat((obj[12])),
                                        jijing_last3year: obj[13] == "" ? 0 : parseFloat((obj[13])),
                                        jijing_sinceThisYear: obj[14] == "" ? 0 : parseFloat((obj[14])),
                                        jijing_sinceestablish: obj[15] == "" ? 0 : parseFloat((obj[15]))

                                    };

                                    alllist.push(data);
                                }

                                var base = require("./jijingbase.js");
                                base.WritetoFile(alllist);
                            }
                        });
                    }
                })(url), index * 1000);
            }

        } catch (err) {
            writelog(err, "Error")
        }
    },

    readfile: function() {

        var file = require("./fileHelper.js");
        var path = require("path");
        var alldataPath = path.join(config.config.basepath, "data", "AllList.json");
        var data = file.readfromFile(alldataPath)
        //console.log(data);
        var alllist = JSON.parse(data);

        /*begin replace  for download method*/


        var base = require("./jijingbase.js");
        base.WritetoFile(alllist);

        /*end for replace method*/
    }
}

module.exports = jijingProcess;