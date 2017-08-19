var jd = require("./jd.js");

var cut = 0.4;
var jdPrice = 1000;
//console.log(data.srvImpr);
//console.log(data.sourceValue);

var urls = [
    "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=27&_=1503102871402",
    "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=34&_=150310282407",
    "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=28&_=1503102917992"

]

for (var i = 1; i <= 200; i++) {
    var url = "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=" + i + "&_=1503102871402";
    //var url =        "https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList&gid=27&_=1503104593912";
    jd.setUrl(url);
    jd.sendRequest(function(url, goods) {

        printgoods(url, goods.miaoShaList);
    })
}


var docount = 0;
var myArray = [];


function printgoods(url, goods) {
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
    if (docount == 200) {
        console.log("i have finised...");
        console.log(myArray.length);


        var result = removeDup(myArray);

        var sd = require('silly-datetime');
        var time = sd.format(new Date(), 'YYYY-MM-DD HH-mm');
        var path = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha\\data\\" + time + ".js";

        var datapath = "E:\\Work\\GitHub\\HTML\\NodeJs\\miaosha\\data\\data.js";

        writetoFile(JSON.stringify(result), path, true);
        writetoFile("var goods = " + JSON.stringify(result) + ";", datapath, false);
    }
}


function isTheSame(good1, good2) {
    if (
        good1.wname === good2.wname &&
        good1.jdPrice === good2.jdPrice &&
        good1.rate === good2.rate &&
        good1.startRemainTime === good2.startRemainTime &&
        good1.endRemainTime === good2.endRemainTime &&
        good1.miaoShaPrice === good2.miaoShaPrice &&
        good1.discount === good2.discount) {
        //console.log(good1.wname  + "               " +good2.wname);
        return true;

    }

    return false;
}

function removeDup(arr) {
    var result =[];
    arr.forEach(function(itemX, indexX) {
        var repeat = false;
        arr.forEach(function(itemY, indexY) {
            if (isTheSame(itemX, itemY) && indexX !=indexY) {
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