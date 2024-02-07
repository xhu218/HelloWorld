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

            var allpages = 82; //82;//74; //;

            var alldata = [];

            var alllist = [];

            var doingCount = 0;

            var top = 200;

            var index = 1;

            var retry = 0;


            SendRequest(function(content) {



                var data = content.replace("var rankData = ", "").replace("};", "}");

                var o = eval("(" + data + ")");
                console.log("allRecords :" + o.allRecords + " pageIndex : " + o.pageIndex + " pageNum : " + o.pageNum, " allPages : " + o.allPages);
                allpages = o.allPages;

                alldata = alldata.concat(o.datas);

                console.log("doingCount = " + doingCount + "allpages = " + allpages);

                if (doingCount == allpages) {

                    for (var i = 0; i < alldata.length; i++) {

                        var obj = alldata[i].split(",");
                        var data = {

                            jijing_Code: obj[0],
                            jijing_Name: obj[1],
                            jijing_Mask: obj[74],
                            jijing_Date: (obj[3] == null || obj[3] == "") ? "1970-01-01" : obj[3],
                            jijing_unitValue: (obj[4] == null || obj[4] == "") ? 0 : parseFloat(obj[4]),
                            jijing_totalValue: (obj[5] == null || obj[5] == "") ? 0 : parseFloat(obj[5]),
                            jijing_daliyIncreaseRate: (obj[6] == null || obj[6] == "") ? 0 : parseFloat(obj[6]),
                            jijing_lastWeek: (obj[7] == null || obj[7] == "") ? 0 : parseFloat((obj[7])),
                            jijing_lastMonth: (obj[8] == null || obj[8] == "") ? 0 : parseFloat((obj[8])),
                            jijing_last3Month: (obj[9] == null || obj[9] == "") ? 0 : parseFloat((obj[9])),
                            jijing_last6Month: (obj[10] == null || obj[10] == "") ? 0 : parseFloat((obj[10])),
                            jijing_last1year: (obj[11] == null || obj[11] == "") ? 0 : parseFloat((obj[11])),
                            jijing_last2year: (obj[12] == null || obj[12] == "") ? 0 : parseFloat((obj[12])),
                            jijing_last3year: (obj[13] == null || obj[13] == "") ? 0 : parseFloat((obj[13])),
                            jijing_sinceThisYear: (obj[14] == null | obj[14] == "") ? 0 : parseFloat((obj[14])),
                            jijing_sinceestablish: (obj[15] == null || obj[15] == "") ? 0 : parseFloat((obj[15]))

                        };

                        alllist.push(data);
                    }

                    /*begin for replace method*/

                    var base = require("./jijingbase.js");
                    base.WritetoFile(alllist);
                    //base.sayHello();

                    /*end for replace method*/
                }


            })









        } catch (err) {
            console.log(err);
            writelog("出错了" + err, "Error");
        }



        function SendRequest(callback) {

            if ((retry++) < 10) {

            } else {
                console.log("retry = " + retry);
                retry = 0;
                console.log("+1了+1了+1了+1了+1了");
                index++;
            }

            if (index > allpages)
                return;

            var tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=50&dx=1&v=" + Math.random();
            var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=74&pn=50&dx=1&v=0.005266926352829326";
            request1.setUrl(url);
            writelog("index = " + index + "             retry = " + retry + "       url = " + tempStr);
            var goods = request1.sendRequest(function(url, content) {

                //console.log(doingCount);
                if (content == null) {
                    writelog("response is null, url =  " + url);
                    SendRequest(callback);
                } else {
                    doingCount++;
                    index++;
                    retry = 0;
                    callback(content);
                    SendRequest(callback);
                }

                console.log("current page : " + url);
            })
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