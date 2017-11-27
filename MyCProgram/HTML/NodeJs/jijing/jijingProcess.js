var request1 = require("./request.js");
require('date-utils');
var config = require("./config.js")



var jijingProcess = {

    download: function() {
        try {


            var dt = new Date();
            var d = dt.toFormat("YYYY-MM-DD");
            console.log(d);

            var allpages = 74; //;

            var alldata = [];

            var alllist = [];

            var doingCount = 0;

            var top = 200

            for (var index = 1; index <= allpages; index++) {

                var tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=50&dx=1&v=" + Math.random();
                var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=74&pn=50&dx=1&v=0.005266926352829326";
                request1.setUrl(url);

                var goods = request1.sendRequest(function(url, content) {
                    doingCount++;
                    console.log(doingCount);
                    if (content == null)
                        return;

                    console.log("current page : " + url);
                    var data = content.replace("var rankData = ", "").replace("};", "}");

                    var o = eval("(" + data + ")");
                    console.log("allRecords :" + o.allRecords + " pageIndex : " + o.pageIndex + " pageNum : " + o.pageNum, " allPages : " + o.allPages);

                    alldata = alldata.concat(o.datas);


                    if (doingCount == allpages) {

                        for (var i = 0; i < alldata.length; i++) {

                            var obj = alldata[i].split(",");
                            var data = {

                                jijing_Code: obj[0],
                                jijing_Name: obj[1],
                                jijing_Mask: obj[74],
                                jijing_Date: obj[3],
                                jijing_unitValue: obj[4],
                                jijing_totalValue: obj[5],
                                jijing_daliyIncreaseRate: obj[6],
                                jijing_lastWeek: obj[7] == "" ? 0 : (parseInt(obj[7])),
                                jijing_lastMonth: obj[8] == "" ? 0 : (parseInt(obj[8])),
                                jijing_last3Month: obj[9] == "" ? 0 : (parseInt(obj[9])),
                                jijing_last6Month: obj[10] == "" ? 0 : (parseInt(obj[10])),
                                jijing_last1year: obj[11] == "" ? 0 : (parseInt(obj[11])),
                                jijing_last2year: obj[12] == "" ? 0 : (parseInt(obj[12])),
                                jijing_last3year: obj[13] == "" ? 0 : (parseInt(obj[13])),
                                jijing_sinceThisYear: obj[14] == "" ? 0 : (parseInt(obj[14])),
                                jijing_sinceestablish: obj[15] == "" ? 0 : (parseInt(obj[15]))

                            };

                            alllist.push(data);
                        }

                        /*begin for replace method*/

                        var base = require("./jijingbase.js");
                        base.WritetoFile(alllist);
                        //base.sayHello();

                        /*end for replace method*/
                    }


                });
            }


        } catch (err) {
            console.log(err);
        }
    },

    readfile: function() {



        var file = require("./fileHelper.js");
        var path = require("path");
        var alldataPath = path.join(config.config.basepath, "Data", "AllList.json");
        var data = file.readfromFile(alldataPath)
        console.log(data);
        var alllist = JSON.parse(data);

        /*begin replace  for download method*/


        var base = require("./jijingbase.js");
        base.WritetoFile(alllist);

        /*end for replace method*/
    }
}

module.exports = jijingProcess;