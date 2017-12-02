var path = require("path");
var file = require("./fileHelper.js");
var writelog = require("./writelog.js");



var url = "http://fund.eastmoney.com/161725.html?spm=search";
var alljjlisturl = "http://xhu219.s3.91sc.top/data/2017-12-02.json";

var total = 3665;
var current = 0;
var goupiao = {};
var jjlist = [];

var req1 = require('request');
req1(alljjlisturl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        var jj = body.replace("var good =", "");
        var jjObjs = JSON.parse(jj);

        for (var i = jjObjs.length - 1; i >= 0; i--) {


            if (i < jjObjs.length - total) {
                break;
            }


            setTimeout(

                ((function(jijing_Code) {
                    return function() {

                        try {

                            var url = "http://fund.eastmoney.com/" + jijing_Code + ".html?spm=search";
                            var request = require('request');
                            request(url, function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    current++;
                                    console.log(current + "\t" + url);

                                    doit(jijing_Code, body);

                                    if (current == total) {
                                        console.log("我已经做完所有的事情了");
                                        //console.log("股票数据的的长度 ＝ " + sizeof(goupiao));

                                        var props = [];
                                        for (var prop in goupiao) {
                                            props.push(prop);
                                        }
                                        props.sort(function(a, b) {
                                            return a - b;
                                        })

                                        var head = "基金名称\t"

                                        for (var i = 0; i < props.length; i++) {
                                            head += props[i] + "\t";
                                        }
                                        head += "\n"
                                        //console.log(head);

                                        //console.log(jjlist);
                                        for (var i = jjlist.length - 1; i >= 0; i--) {
                                            for (var sProp in goupiao) {
                                                //console.log(sProp);
                                                if (jjlist[i][sProp] == null) {
                                                    jjlist[i][sProp] = null;
                                                }

                                            }
                                            var jjinfo = jjlist[i].jijing_Code + "\t";
                                            for (var j = 0; j < props.length; j++) {
                                                jjinfo += jjlist[i][props[j]] + "\t";
                                            }
                                            jjinfo += "\n";

                                            head += jjinfo;

                                            //console.log("\n\n");
                                            //console.log(JSON.stringify(jjlist[i]));
                                        }
                                        //console.log(head);
                                        file.writetoFile(head, "result.txt", false, function(filepath) {
                                            console.log("已经成功写入文件" + filepath);
                                        })

                                    }

                                } else {
                                    writelog(url + "出错了");
                                }

                            });
                        } catch (err) {
                            writelog(err + jijing_Code);
                        }

                    }

                })(jjObjs[i].jijing_Code)), i * 50);
        }
    }
})







//var filecontent = file.readfromFile("wfg.html");
//doit(filecontent);

function doit(jijing_Code, content) {

    var regTab = /<li class=\"position_shares\" id=\"position_shares\">[\s\S]*?<\/li>/gi;
    var regTr = /<tr>[\s\S]*?<\/tr>/g;
    var regTdName = /<td class=\"alignLeft\">   <a href=[^>]*>([\S]*?)<\/a>  <\/td>  <td class=\"alignRight bold\">(.*?)<\/td>  <td class=\"alignRight bold\" stockcode=\".*?\"><span class=[^>]*?>(.*?)<\/span>  <\/td>/g

    var data = regTab.exec(content);
    //console.log(data[0]);

    var jj = { "jijing_Code": jijing_Code };
    jjlist.push(jj);
    while (tr = regTr.exec(data[0])) {
        // console.log(tr[0]);

        while (td = regTdName.exec(tr[0])) {
            //console.log(td);
            //console.log(td[1], td[2], td[3]);
            jj[td[1]] = td[2];

            goupiao[td[1]] = 1;
        }
    }

}