var path = require("path");
var config = require('./config')
jijingbase = {
    sayHello: function() {
        console.log("hello...");
    },
    WritetoFile: function(alllist) {
        var top = 20;
        var dt = new Date();
        var d = dt.toFormat("YYYY-MM-DD HH24 MI SS");
        console.log(d);
        console.log("start...");
        var file = require("./fileHelper.js");


        //var rootDir = path.join(__dirname, "Data");
        var rootDir = path.join(config.config.basepath, "Data"); 

        //All List

        file.writetoFile(JSON.stringify(alllist, null, "\t"), path.join(rootDir, "AllList.json"), false);
        file.writetoFile(JSON.stringify(alllist, null, "\t"), path.join(rootDir, "AllList", d + ".json"), false);


        //Last3Years

        var last3year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last3year) - parseInt(b.jijing_last3year);
        });
        var last3yeartop100 = [];
        var last3yearDict = new Array();
        for (var i = 0; i < alllist.length; i++) {
            last3year[i].Sort = i;
            if (i <= top)
                last3yeartop100.push(last3year[i]);            
        }

        file.writetoFile(JSON.stringify(last3year, null, "\t"), path.join(rootDir, "Last3Year.json"), false);
        file.writetoFile(JSON.stringify(last3yeartop100, null, "\t"), path.join(rootDir, "Last3Yeartopn.json"), false);
        file.writetoFile(JSON.stringify(last3year, null, "\t"), path.join(rootDir, "Last3Year", d + ".json"), false);
        

        //Last2Years


        var last2year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last2year) - parseInt(b.jijing_last2year);
        });
        var last2yeartop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            last2year[i].Sort = i;
            if (i <= top)
                last2yeartop100.push(last2year[i]);
        }
        
        file.writetoFile(JSON.stringify(last2year, null, "\t"), path.join(rootDir, "Last2Year.json"), false);
        file.writetoFile(JSON.stringify(last2yeartop100, null, "\t"), path.join(rootDir, "Last2Yeartopn.json"), false);
        file.writetoFile(JSON.stringify(last2year, null, "\t"), path.join(rootDir, "Last2Year", d + ".json"), false);

        //Last1Year

        var last1year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last1year) - parseInt(b.jijing_last1year);
        });
        var last1yeartop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            last1year[i].Sort = i;
            if (i <= top)
                last1yeartop100.push(last1year[i]);
        }

        file.writetoFile(JSON.stringify(last1year, null, "\t"), path.join(rootDir, "Last1Year.json"), false);
        file.writetoFile(JSON.stringify(last1yeartop100, null, "\t"), path.join(rootDir, "Last1Yeartopn.json"), false);
        file.writetoFile(JSON.stringify(last1year, null, "\t"), path.join(rootDir, "Last1Year", d + ".json"), false);

        
        //Last6Month

        var last6Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last6Month) - parseInt(b.jijing_last6Month);
        });
        var last6Monthtop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            last6Month[i].Sort = i;
            if (i <= top)
                last6Monthtop100.push(last6Month[i]);
        }
        file.writetoFile(JSON.stringify(last6Month, null, "\t"), path.join(rootDir, "Last6Month.json"), false);
        file.writetoFile(JSON.stringify(last6Monthtop100, null, "\t"), path.join(rootDir, "Last6Monthtopn.json"), false);
        file.writetoFile(JSON.stringify(last6Month, null, "\t"), path.join(rootDir, "Last6Month", d + ".json"), false);

        //Last3Month

        var last3Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last3Month) - parseInt(b.jijing_last3Month);
        });
        var last3Monthtop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            last3Month[i].Sort = i;
            if (i <= top)
                last3Monthtop100.push(last3Month[i]);
        }
        file.writetoFile(JSON.stringify(last3Month, null, "\t"), path.join(rootDir, "Last3Month.json"), false);
        file.writetoFile(JSON.stringify(last3Monthtop100, null, "\t"), path.join(rootDir, "Last3Monthtopn.json"), false);
        file.writetoFile(JSON.stringify(last3Month, null, "\t"), path.join(rootDir, "Last3Month", d + ".json"), false);

        //LastMonth
        
        var lastMonth = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastMonth, null, "\t") - parseInt(b.jijing_lastMonth);
        });
        var lastMonthtop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            lastMonth[i].Sort = i;
            if (i <= top)
                lastMonthtop100.push(lastMonth[i]);
        }
        file.writetoFile(JSON.stringify(lastMonth, null, "\t"), path.join(rootDir, "Last1Month.json"), false);
        file.writetoFile("var month1 = "+ JSON.stringify(lastMonthtop100, null, "\t"), path.join(rootDir, "Last1Monthtopn.json"), false);
        file.writetoFile(JSON.stringify(lastMonth, null, "\t"), path.join(rootDir, "Last1Month", d + ".json"), false);

        //LastWeek

        var lastWeek = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastWeek) - parseInt(b.jijing_lastWeek);
        });

        var lastWeektop100 = [];
        for (var i = 0; i < alllist.length; i++) {
            lastWeek[i].Sort = i;
            if (i <= top)
                lastWeektop100.push(lastWeek[i]);
        }
        file.writetoFile(JSON.stringify(lastWeek, null, "\t"), path.join(rootDir, "LastWeek.json"), false);
        file.writetoFile(JSON.stringify(lastWeektop100, null, "\t"), path.join(rootDir, "LastWeektopn.json"), false);
        file.writetoFile(JSON.stringify(lastWeek, null, "\t"), path.join(rootDir, "LastWeek", d + ".json"), false);

        var result = [];

        console.log(last3yeartop100.length, last2yeartop100.length, last1yeartop100.length, last6Monthtop100.length, last3Monthtop100.length, lastMonthtop100.length, lastWeektop100.length);

        for (var a = 0; a < last1yeartop100.length; a++) {
            console.log(a);
            if (isInList(last1yeartop100[a].jijing_Code, last3Month)
                //&& isInList(last1yeartop100[a].jijing_Code, last3Monthtop100) 
                // && isInList(lastWeektop100[a].jijing_Code, last6Monthtop100) 
                // && isInList(lastWeektop100[a].jijing_Code, last1yeartop100) 
                // && isInList(lastWeektop100[a].jijing_Code, last2yeartop100)
                // &&isInList(lastWeektop100[a].jijing_Code, last3yeartop100)
            ) {
                result.push(lastWeektop100[a]);

            }
        }

        function isInList(item, list) {

            for (var i = list.length - 1; i >= 0; i--) {
                if (item == list[i].jijing_Code) {
                    return true;
                }
                return false;
            }
        }



        file.writetoFile(JSON.stringify(result, null, "\t"), path.join(rootDir, "result.json"), false);



        console.log("i have finished...");

        console.log(JSON.stringify(result));
    }
}
module.exports = jijingbase;