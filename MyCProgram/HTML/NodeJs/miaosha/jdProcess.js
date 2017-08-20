var jd = require("./jd.js");

var jdProcess = {
    job: function() {

        var cut = 0.3;
        var jdPrice = 1000;

        var docount = 0;
        var totalcount = 100;
        var myArray = [];


        function printgoods(url, goods) {
            //console.log(url, goods);
            docount++;
            console.log(docount);
            //console.log(goods);
            goods.forEach(function(good, index) {
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
                result.sort(function(a, b) {
                    return a.wareId - b.wareId;
                });

                var datapath = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha\\data\\data.js";
                var extenpath = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha\\data\\extentinfo.js"
                var fromfile = readfromFile(datapath);

                //console.log("from is ok1 " + fromfile);
                var from = JSON.parse(fromfile.replace("var goods = ", "").replace("}];", "}]"));
                var writeto = "var goods = " + JSON.stringify(result) + ";";
                console.log("from is ok ");
                var f = isTheSameList(result, from);
                console.log("current f is :" + f);
                if (!f) {

                    var sd = require('silly-datetime');
                    var time = sd.format(new Date(), 'YYYY-MM-DD HH-mm');
                    var path = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha\\data\\" + time + ".js";

                    writetoFile(writeto, path, true);
                    writetoFile(writeto, datapath, false);

                    var time1 = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
                    var info = "var extentinfo = {    lastUpdateTime:'"+ time1 +"'}";
                    writetoFile(info, extenpath, false);                    

                    //TODO 发送邮件提醒
                } else {
                    console.log("到服务器查了，与上次数据一样，因此不保存")
                }

            }
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
            arr.forEach(function(itemX, indexX) {
                var repeat = false;
                arr.forEach(function(itemY, indexY) {
                    if (isTheSame(itemX, itemY) && indexX != indexY) {
                        repeat = true;
                    }
                });
                if (!repeat) {
                    console.log("是唯一的，因此添加进去。。。。");
                    result.push(itemX);
                }
            });
            return result;
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
            var goods = jd.sendRequest(function(url, goods) {
                //console.log(url, goods);
                printgoods(url, goods.miaoShaList);
            })
        }
    }
};


module.exports = jdProcess;