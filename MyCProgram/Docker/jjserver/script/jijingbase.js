var path = require("path");
var config = require('./config')
var fund_mysql = require("./fund_mysql.js");

jijingbase = {
    sayHello: function() {
        console.log("hello...");
    },
    WritetoFile: function(alllist) {
        var top = 20;
        var dt = new Date();
        var d = dt.toFormat("YYYY-MM-DD"); //dt.toFormat("YYYY-MM-DD HH24 MI SS");
        console.log(d);
        console.log("start...");
        var file = require("./fileHelper.js");


        //var rootDir = path.join(__dirname, "Data");
        var rootDir = path.join(config.config.basepath, "data");

        //All List



        var allDict = new Array();
        for (var i = alllist.length - 1; i >= 0; i--) {

            allDict[alllist[i].jijing_Code] = alllist[i];
            //console.log(alllist[i]);
        }
        //Last3Year

        var last3year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last3year) - parseInt(b.jijing_last3year);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last3year_sort = i;

        }

        //Last2Year
        var last2year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last2year) - parseInt(b.jijing_last2year);
        });
        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last2year_sort = i;
        }


        //Last6Month

        var last6Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last6Month) - parseInt(b.jijing_last6Month);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last6Month_sort = i;
        }
        //Last3Month

        var last3Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last3Month) - parseInt(b.jijing_last3Month);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last3Month_sort = i;
        }

        //LastMonth

        var lastMonth = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastMonth, null, "\t") - parseInt(b.jijing_lastMonth);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_lastMonth_sort = i;
        }

        //LastWeek

        var lastWeek = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastWeek) - parseInt(b.jijing_lastWeek);
        });


        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_lastWeek_sort = i;
        }

        //Last1Year

        var last1year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last1year) - parseInt(b.jijing_last1year);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last1year_sort = i;
        }

        //20171127 wfg 个人选择的功能，直接在前端处理，因此去掉这段逻辑
        /*
        var content = file.readfromFile(path.join(rootDir, "Select.json"));
        var select = null;
        console.log(content);
        try {
            select = JSON.parse(content);
        } catch (err) {
            console.log(err);
        }

        for (var i = select.length - 1; i >= 0; i--) {
            if (allDict[select[i].jijing_Code] != null) {
                allDict[select[i].jijing_Code].select = true;
            }
        }
*/

        var data = [];
        for (var i = 0; i < alllist.length; i++) {

/*
            alllist[i].jijing_last3year = parseInt(alllist[i].jijing_last3year).toFixed(2);
            alllist[i].jijing_last2year = parseInt(alllist[i].jijing_last2year).toFixed(2);
            alllist[i].jijing_last1year = parseInt(alllist[i].jijing_last1year).toFixed(2);
            alllist[i].jijing_last6Month = parseInt(alllist[i].jijing_last6Month).toFixed(2);
            alllist[i].jijing_last3Month = parseInt(alllist[i].jijing_last3Month).toFixed(2);
            alllist[i].jijing_lastMonth = parseInt(alllist[i].jijing_lastMonth).toFixed(2);
            alllist[i].jijing_lastWeek = parseInt(alllist[i].jijing_lastWeek).toFixed(2);


            alllist[i].jijing_totalValue = parseInt(alllist[i].jijing_totalValue).toFixed(2);
            alllist[i].jijing_daliyIncreaseRate = parseInt(alllist[i].jijing_daliyIncreaseRate).toFixed(2);
            alllist[i].jijing_unitValue = parseInt(alllist[i].jijing_unitValue).toFixed(2);
*/
            data.push(allDict[alllist[i].jijing_Code]);

        }
        try {

            fund_mysql.insertall(data);
        } catch (error) { console.log(error); }

        file.writetoFile("var good = " + JSON.stringify(data, null, "\t"), path.join(rootDir, d + ".json"), false);
        //file.writetoFile(JSON.stringify(d, null, "\t"), path.join(rootDir, "AllList", d + ".json"), false);

        function isInList(item, list) {

            for (var i = list.length - 1; i >= 0; i--) {
                if (item == list[i].jijing_Code) {
                    return true;
                }
                return false;
            }
        }

        console.log("i have finished...");


    }
}
module.exports = jijingbase;