var request1 = require("./request.js");
require('date-utils');



var jijingProcess = {
    download: function() {
        try {

            var date = new Date();
            date.addMonths(1);
            var d = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

            var allpages = 73;

            var alldata = [];

            var alllist = [];

            var doingCount = 0;

            for (var index = 1; index <= allpages; index++) {

                var tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=50&dx=1&v=" + Math.random();
                var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=2&pn=50&dx=1&v=0.005266926352829326";
                request1.setUrl(url);

                var goods = request1.sendRequest(function(url, content) {

                    console.log("current page : " + url);
                    var data = content.replace("var rankData = ", "").replace("};", "}");

                    var o = eval("(" + data + ")");
                    console.log("allRecords :" + o.allRecords + " pageIndex : " + o.pageIndex + " pageNum : " + o.pageNum, " allPages : " + o.allPages);

                    alldata = alldata.concat(o.datas);
                    doingCount++;

                    if (doingCount == allpages) {
						
                        for (var i = 0; i < alldata.length; i++) {

                            var obj = alldata[i].split(",");
                            var data = {

                                jijing_Code: obj[0],
                                jijing_Name: obj[1],
                                jijing_Mask: obj[2],
                                jijing_Date: obj[3],
                                jijing_unitValue: obj[4],
                                jijing_totalValue: obj[5],
                                jijing_daliyIncreaseRate: obj[6],
                                jijing_lastWeek: obj[7],
                                jijing_lastMonth: obj[8],
                                jijing_last3Month: obj[9],
                                jijing_last6Month: obj[10],
                                jijing_las1year: obj[11],
                                jijing_last2year: obj[12],
                                jijing_last3year: obj[13],
                                jijing_sinceThisYear: obj[14],
                                jijing_sinceestablish: obj[15],

                            };

                            alllist.push(data);
                        }

                        writetoFile(JSON.stringify(alllist), __dirname + "\\alllist.json", false);

                        var top = 200

                        var last3year = alllist.sort(function(a, b) {
                            return a.jijing_last3year - b.jijing_last3year;
                        });

                        var last3yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last3yeartop100.push(last3year[i])
                        }

                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(last3year), __dirname + "\\log.txt", true);


                        var last2year = alllist.sort(function(a, b) {
                            return a.jijing_last2year - b.jijing_last2year;
                        });

                        var last2yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last2yeartop100.push(last2year[i])

                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(last2year), __dirname + "\\log.txt", true);

                        var last1year = alllist.sort(function(a, b) {
                            return a.jijing_last1year - b.jijing_last1year;
                        });

                        var last1yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last1yeartop100.push(last1year[i]);
                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(last1year), __dirname + "\\log.txt", true);

                        var last6Month = alllist.sort(function(a, b) {
                            return a.jijing_last6Month - b.jijing_last6Month;
                        });
                        var last6Monthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            last6Monthtop100.push(last6Month[i]);
                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(last6Month), __dirname + "\\log.txt", true);

                        var last3Month = alllist.sort(function(a, b) {
                            return a.jijing_last3Month - b.jijing_last3Month;
                        });
                        var last3Monthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            last3Monthtop100.push(last3Month[i]);
                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(last3Month), __dirname + "\\log.txt", true);


                        var lastMonth = alllist.sort(function(a, b) {
                            return a.jijing_lastMonth - b.jijing_lastMonth;
                        });
                        var lastMonthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            lastMonthtop100.push(lastMonth[i]);
                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(lastMonth), __dirname + "\\log.txt", true);

                        var lastWeek = alllist.sort(function(a, b) {
                            return a.jijing_lastWeek - b.jijing_lastWeek;
                        });

                        var lastWeektop100 = [];
                        for (var i = 0; i < top; i++) {
                            lastWeektop100.push(lastWeek[i]);
                        }
                        writetoFile("--------------------------------------------------------------", __dirname + "\\log.txt", true);
                        writetoFile(JSON.stringify(lastWeek), __dirname + "\\log.txt", true);


                        for (var i = 0; i < last3yeartop100.length; i++) {
                            for (var j = 0; j < last2yeartop100.length; i++) {
                                for (var k = 0; k < last1yeartop100.length; i++) {
                                    for (var m = 0; m < last6Monthtop100.length; i++) {
                                        for (var n = 0; n < last3Monthtop100.length; i++) {
                                            for (var l = 0; l < lastMonthtop100.length; i++) {
                                                for (var a = 0; a < lastWeektop100.length; i++) {
                                                    if (last3yeartop100[i] == last2yeartop100[j] == last1yeartop100[k] == last6Monthtop100[m] == last3Monthtop100[n] == lastMonthtop100[l] == lastWeektop100[a]) {
                                                        console.log(last3yeartop100[i].jijing_Code + last3yeartop100[i].jijing_Name);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }


                        console.log("i have finished...");
                    }

                });
            }


        } catch (err) {
            console.log(err);
        }

        function writetoFile(content, file, append) {
            var fs = require("fs");
            if (append) {
                fs.appendFile(file, content, function(err) {
                    if (err) {
                        console.log("fail" + err)
                    } else {
                        console.log("写入文件成功");
                    }

                });
            } else {
                fs.writeFile(file, content, function(err) {
                    if (err) {
                        console.log("fail" + err)
                    } else {
                        console.log("写入文件成功");
                    }

                });
            }
        }

    }
}

module.exports = jijingProcess;