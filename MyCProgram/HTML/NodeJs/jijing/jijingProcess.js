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

            var top = 50

            for (var index = 1; index <= allpages; index++) {

                var tempStr = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=" + d + "&ed=" + d + "&qdii=&tabSubtype=,,,,,&pi=" + index + "&pn=50&dx=1&v=" + Math.random();
                var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=2&pn=50&dx=1&v=0.005266926352829326";
                request1.setUrl(url);

                var goods = request1.sendRequest(function(url, content) {
                    doingCount++;
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
                                jijing_Mask: obj[2],
                                jijing_Date: obj[3],
                                jijing_unitValue: obj[4],
                                jijing_totalValue: obj[5],
                                jijing_daliyIncreaseRate: obj[6],
                                jijing_lastWeek: obj[7] == "" ? 0 : parseInt(obj[7]),
                                jijing_lastMonth: obj[8] == "" ? 0 : parseInt(obj[8]),
                                jijing_last3Month: obj[9] == "" ? 0 : parseInt(obj[9]),
                                jijing_last6Month: obj[10] == "" ? 0 : parseInt(obj[10]),
                                jijing_last1year: obj[11] == "" ? 0 : parseInt(obj[11]),
                                jijing_last2year: obj[12] == "" ? 0 : parseInt(obj[12]),
                                jijing_last3year: obj[13] == "" ? 0 : parseInt(obj[13]),
                                jijing_sinceThisYear: obj[14] == "" ? 0 : parseInt(obj[14]),
                                jijing_sinceestablish: obj[15] == "" ? 0 : parseInt(obj[15])

                            };

                            alllist.push(data);
                        }
                       
                        writetoFile(JSON.stringify(alllist,null, "\t"), __dirname + "\\alllist.json", false);



                        var last3year = alllist.sort(function(b, a) {

                            return parseInt(a.jijing_last3year) - parseInt(b.jijing_last3year);
                        });
                        var last3yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last3yeartop100.push(last3year[i]);
                        }
                        writetoFile(JSON.stringify(last3year, null, "\t"), __dirname + "\\last3Year.json", false);


                        var last2year = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_last2year) - parseInt(b.jijing_last2year);
                        });
                        var last2yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last2yeartop100.push(last2year[i]);
                        }
                        writetoFile(JSON.stringify(last2year, null, "\t"), __dirname + "\\last2Year.json", false);

                        var last1year = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_last1year) - parseInt(b.jijing_last1year);
                        });
                        var last1yeartop100 = [];
                        for (var i = 0; i < top; i++) {
                            last1yeartop100.push(last1year[i]);
                        }
                        writetoFile(JSON.stringify(last1year, null, "\t"), __dirname + "\\last1Year.json", false);

                        var last6Month = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_last6Month) - parseInt(b.jijing_last6Month);
                        });
                        var last6Monthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            last6Monthtop100.push(last6Month[i]);
                        }
                        writetoFile(JSON.stringify(last6Month, null, "\t"), __dirname + "\\last6Month.json", false);

                        var last3Month = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_last3Month) - parseInt(b.jijing_last3Month);
                        });
                        var last3Monthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            last3Monthtop100.push(last3Month[i]);
                        }
                        writetoFile(JSON.stringify(last3Month, null, "\t"), __dirname + "\\last3Month.json", false);


                        var lastMonth = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_lastMonth, null, "\t") - parseInt(b.jijing_lastMonth);
                        });
                        var lastMonthtop100 = [];
                        for (var i = 0; i < top; i++) {
                            lastMonthtop100.push(lastMonth[i]);
                        }
                        writetoFile(JSON.stringify(lastMonth, null, "\t"), __dirname + "\\last1Month.json", false);

                        var lastWeek = alllist.sort(function(b, a) {
                            return parseInt(a.jijing_lastWeek) - parseInt(b.jijing_lastWeek);
                        });

                        var lastWeektop100 = [];
                        for (var i = 0; i < top; i++) {
                            lastWeektop100.push(lastWeek[i]);
                        }
                        writetoFile(JSON.stringify(lastWeek, null, "\t"), __dirname + "\\lastWeek.json", false);

                        var result = [];

                        console.log(last3yeartop100.length, last2yeartop100.length, last1yeartop100.length, last6Monthtop100.length, last3Monthtop100.length, lastMonthtop100.length, lastWeektop100.length);

                        for (var a = 0; a < lastWeektop100.length; a++) {
                            console.log(a);
                            if (isInList(lastWeektop100[a].jijing_Code, lastMonthtop100)
                                //&& isInList(lastWeektop100[a].jijing_Code, last3Monthtop100) 
                                //&& isInList(lastWeektop100[a].jijing_Code, last6Monthtop100) 
                                //&& isInList(lastWeektop100[a].jijing_Code, last1yeartop100) 
                                //&& isInList(lastWeektop100[a].jijing_Code, last2yeartop100)
                                //&&isInList(lastWeektop100[a].jijing_Code, last3yeartop100)
                            ) {
                                result.push(lastWeektop100[a]);

                            }
                        }



                        writetoFile(JSON.stringify(result, null, "\t"), __dirname + "\\result.json", false);



                        console.log("i have finished...");

                        console.log(JSON.stringify(result));
                    }


                });
            }


        } catch (err) {
            console.log(err);
        }

        function isInList(item, list) {

            for (var i = list.length - 1; i >= 0; i--) {
                if (item == list[i].jijing_Code) {
                    return true;
                }
                return false;
            }
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

    },

    readfile: function() {

        var top = 500;

        function isInList(item, list) {

            for (var i = list.length - 1; i >= 0; i--) {
                if (item == list[i].jijing_Code) {
                    return true;
                }
                return false;
            }
        }

        function readfromFile(file) {
            var rf = require("fs");
            var data = rf.readFileSync(file, "utf-8");
            return data;
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

        var alllist = JSON.parse(readfromFile(__dirname + "\\alllist.json"));

        var last3year = alllist.sort(function(b, a) {

            return parseInt(a.jijing_last3year) - parseInt(b.jijing_last3year);
        });
        var last3yeartop100 = [];
        for (var i = 0; i < top; i++) {
            last3year[i].Sort = i;
            last3yeartop100.push(last3year[i]);
        }
        writetoFile(JSON.stringify(last3year, null, "\t"), __dirname + "\\last3Year.json", false);


        var last2year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last2year) - parseInt(b.jijing_last2year);
        });
        var last2yeartop100 = [];
        for (var i = 0; i < top; i++) {
            last2year[i].Sort = i;
            last2yeartop100.push(last2year[i]);
        }
        writetoFile(JSON.stringify(last2year, null, "\t"), __dirname + "\\last2Year.json", false);

        var last1year = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last1year) - parseInt(b.jijing_last1year);
        });
        var last1yeartop100 = [];
        for (var i = 0; i < top; i++) {
            last1year[i].Sort = i;
            last1yeartop100.push(last1year[i]);
        }
        writetoFile(JSON.stringify(last1year, null, "\t"), __dirname + "\\last1Year.json", false);

        var last6Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last6Month) - parseInt(b.jijing_last6Month);
        });
        var last6Monthtop100 = [];
        for (var i = 0; i < top; i++) {
            last6Month[i].Sort = i;
            last6Monthtop100.push(last6Month[i]);
        }
        writetoFile(JSON.stringify(last6Month, null, "\t"), __dirname + "\\last6Month.json", false);

        var last3Month = alllist.sort(function(b, a) {
            return parseInt(a.jijing_last3Month) - parseInt(b.jijing_last3Month);
        });
        var last3Monthtop100 = [];
        for (var i = 0; i < top; i++) {
            last3Month[i].Sort = i;
            last3Monthtop100.push(last3Month[i]);
        }
        writetoFile(JSON.stringify(last3Month, null, "\t"), __dirname + "\\last3Month.json", false);


        var lastMonth = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastMonth, null, "\t") - parseInt(b.jijing_lastMonth);
        });
        var lastMonthtop100 = [];
        for (var i = 0; i < top; i++) {
            lastMonth[i].Sort = i;
            lastMonthtop100.push(lastMonth[i]);
        }
        writetoFile(JSON.stringify(lastMonth, null, "\t"), __dirname + "\\last1Month.json", false);

        var lastWeek = alllist.sort(function(b, a) {
            return parseInt(a.jijing_lastWeek) - parseInt(b.jijing_lastWeek);
        });

        var lastWeektop100 = [];
        for (var i = 0; i < top; i++) {
            lastWeek[i].Sort = i;
            lastWeektop100.push(lastWeek[i]);
        }
        writetoFile(JSON.stringify(lastWeek, null, "\t"), __dirname + "\\lastWeek.json", false);

        var result = [];

        console.log(last3yeartop100.length, last2yeartop100.length, last1yeartop100.length, last6Monthtop100.length, last3Monthtop100.length, lastMonthtop100.length, lastWeektop100.length);

        for (var a = 0; a < lastWeektop100.length; a++) {
            console.log(a);
            if (isInList(lastWeektop100[a].jijing_Code, lastMonthtop100)
              //  && isInList(lastWeektop100[a].jijing_Code, last3Monthtop100) 
               // && isInList(lastWeektop100[a].jijing_Code, last6Monthtop100) 
               // && isInList(lastWeektop100[a].jijing_Code, last1yeartop100) 
               // && isInList(lastWeektop100[a].jijing_Code, last2yeartop100)
               // &&isInList(lastWeektop100[a].jijing_Code, last3yeartop100)
            ) {
                result.push(lastWeektop100[a]);

            }
        }



        writetoFile(JSON.stringify(result, null, "\t"), __dirname + "\\result.json", false);



        console.log("i have finished...");

        console.log(JSON.stringify(result));
    }





}

module.exports = jijingProcess;