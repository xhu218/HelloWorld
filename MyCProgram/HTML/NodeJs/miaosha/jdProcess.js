var jd = require("./jd.js");
require('date-utils');
var sendmail = require("./mail.js");
var spuId = [];
var lastUpdateTime = null;

var jdProcess = {
    
    job: function () {

        var cut = 0.3;
        var jdPrice = 1000;

        var docount = 0;
        var totalcount = 48;
        var myArray = [];
        

        //r root_dir = "/ext_file_root/bucket-z/wfg/jd";
        var root_dir = __dirname;


        function printgoods(url, goods) {
            //console.log(url, goods);
            docount++;
            console.log(docount);
            //console.log(goods);
            goods.forEach(function (good, index) {
                if (good.miaoShaPrice / good.jdPrice < cut) {

                    //console.log(index, item.jdPrice, item.miaoShaPrice, item.miaoShaPrice / item.jdPrice, item.wname);
                    good["url"] = url;
                    good["imageurl"] = "http:" + good["imageurl"]
                    myArray.push(good);

                }
            })
            if (docount == totalcount) {
                console.log("i have finised...");
                console.log(myArray.length);


                var result = removeDup(myArray);
                result.sort(function (a, b) {
                    return a.startTimeShow.replace(":","") - b.startTimeShow.replace(":","");
                });

                var datapath = root_dir + "/data/data.js";
                var extenpath = root_dir + "/data/extentinfo.js"
                var fromfile = readfromFile(datapath);

                //console.log("from is ok1 " + fromfile);
                var from = JSON.parse(fromfile.replace("var goods = ", "").replace("}];", "}]"));
                var writeto = "var goods = " + JSON.stringify(result) + ";";
                console.log("from is ok ");
                var f = isTheSameList(result, from);
                console.log("current f is :" + f);
                if (!f) {

                    //针对超级秒杀，单独发邮件给13548180218@139.com
                    for (var i = 0; i < result.length; i++) {
                        var r = result[i];
                        if (r.miaoShaPrice == 1 || r.miaoShaPrice<10) {


                            //先判断此ID是否已经发送过了
                            var contains = false;
                            for (var index = 0; index < spuId.length; index++) {
                                if (r.wareId == spuId[index])
                                    contains = true;
                            }

                            if (contains == false) {

                                //时间换了一天，就把spuId清空掉再来
                                if(lastUpdateTime == null){lastUpdateTime = new Date().getDay();}
                                if(lastUpdateTime != new Date().getDay() ){
								    //the days is changed.
                                    lastUpdateTime = new Date().getDay();
                                    spuId = [];
                                }
                                    
                                spuId.push(r.wareId);
                             
                                //间隔十秒再发送消息
                                var date = new Date();
                                var dt = new Date(date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + r.startTimeShow);
                                dt.addMonths(1);
                                // dt.addMinutes(7);

                                if(date.compareTo(dt)==1){
                                    dt.addDays(1);
                                }                                    

                                var title = dt.toFormat("YYYY-MM-DD HH24:MI") + " " + r.wname;
                                var content = GetMailContent([r]);
                                
                                setTimeout((function(t,c) {
                                    return function() {
                                        sendmail("13548180218@139.com", t, c);
                                    }
                                })(title,content), index * 10000);


                            }
                        }
                    }


                    var sd = require('silly-datetime');
                    var time = sd.format(new Date(), 'YYYY-MM-DD HH-mm');
                    var path = root_dir + "/data/" + time + ".js";

                    writetoFile(writeto, path, true);
                    writetoFile(writeto, datapath, false);

                    sendmail('67438964@qq.com', '数据有更新', GetMailContent(result));

                    var time1 = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
                    var info = "var extentinfo = {    lastUpdateTime:'" + time1 + "'}";
                    writetoFile(info, extenpath, false);

                    //TODO 发送邮件提醒
                } else {
                    console.log("到服务器查了，与上次数据一样，因此不保存")
                }

            }
        }

        function GetMailContent(arr) {


            var content = "<table style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px ;'> <caption>秒杀数据</caption> <thead> <tr style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>图片</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>京东价格</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>秒杀价格</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px '>降价</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px '>折扣</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px '>开始时间</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>结束时间</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>卖出比例</th> <th style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>名字</th> </tr> </thead> <tbody> ";


            for (var x = 0; x < arr.length; x++) {
                content += "<tr> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '><img src='" 
                + arr[x].imageurl + "' /></td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].jdPrice + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].miaoShaPrice + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].discount + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].rate + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].startTimeShow + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + (arr[x].endRemainTime / 60 / 60).toFixed(0) + "小时后</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '>" 
                + arr[x].soldRate + "</td> <td style='border:solid;margin: 0,0,0,0;padding: 0,0,0,0;border-width: 1px 1px 0px 0px '><a href='https://search.jd.com/Search?enc=utf-8&keyword=" 
                + arr[x].wname + "' target='_blank '>" + arr[x].wname + "</a></td> </tr>";
            }

            content += "</tbody> </table>";
            return content;
        }



        function isTheSameList(arr1, arr2) {
            console.log("arr1.length = " + arr1.length + "arr2.length = " + arr2.length);
            if (arr1.length != arr2.length) {
                return false;
            }

            for (var x = 0; x < arr1.length; x++) {
                var find = false;
                for (var y = 0; y < arr2.length; y++) {
                    if (isTheSame(arr1[x], arr2[y])) {
                        find = true;
                    }
                }
                if (find == false) return false;
            }
            return true;
        }

        function isTheSame(good1, good2) {
            if (
                good1.wareId == good2.wareId &&
                good1.wname == good2.wname &&
                good1.jdPrice == good2.jdPrice &&
                good1.rate == good2.rate &&
                good1.miaoShaPrice == good2.miaoShaPrice &&
                good1.discount == good2.discount) {
                return true;
            } else {
                return false;
            }
        }

        function removeDup(arr) {
            /*没有提前返回，这么调没有问题*/
            var result = [];
            arr.forEach(function (itemX, indexX) {
                var repeat = false;
                arr.forEach(function (itemY, indexY) {
                    if (isTheSame(itemX, itemY) && indexX != indexY) {
                        repeat = true;
                    }
                });
                if (!repeat) {
                    console.log("是唯一的，因此添加进去。。。。" + itemX.wname);
                    result.push(itemX);
                }
            });
            return result;
        }

        function writetoFile(content, file, append) {
            var fs = require("fs");
            if (append) {
                fs.appendFile(file, content, function (err) {
                    if (err) {
                        console.log("fail" + err)
                    } else {
                        console.log("写入文件成功");
                    }

                });
            } else {
                fs.writeFile(file, content, function (err) {
                    if (err) {
                        console.log("fail" + err)
                    } else {
                        console.log("写入文件成功");
                    }

                });
            }
        }

        function readfromFile(file) {
            var rf = require("fs");
            var data = rf.readFileSync(file, "utf-8");
            return data;
        }

        var urls = [
            "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=27&_=1503102871402",
            "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=34&_=150310282407",
            "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=28&_=1503102917992"
        ];

        for (var i = 1; i <= totalcount; i++) {

            var url = "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=" + i + "&_=1503102871402";
            //var url =        "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=27&_=1503104593912";
            jd.setUrl(url);
            try {
                var goods = jd.sendRequest(function (url, goods) {
                    //console.log(url, goods);
                    printgoods(url, goods.miaoShaList);
                });
            } catch (err) {
                console.log(err);
            }

        }
    }
};


module.exports = jdProcess;
