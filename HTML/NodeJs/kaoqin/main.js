var kaoqinbase = require("./kaoqinbase.js");
var fileHelper = require("./fileHelper.js");
var requestdetails = require("./requestdetail.js");

var path = require("path");
require('date-utils');
//var usernames = ["李安平", "任波", "向科林", "杨先珉", "周毅超", "王邱云", "梁微微", "韦韩威", "赵林先", "曾智燕", "钟勇军", "胡晨杰", "陈启帆", "陈俊峰", "胡严正", "李鹏程", "张杰", "陈存超", "李春艳", "肖猎", "虞苡淞", "白博娟", "韩慧", "黄翔", "王娟", "王玲", "王梅霞", "骆希文", "李竹涛", "罗壬闳", "彭翔", "王勋", "朱天羿", "唐伟", "张敏", "杜强", "黄杰", "吴广龙", "杨吉彪", "余凯", "赵敬", "连凤阳", "王金鸣", "徐涛", "张矛吉", "赵辉辉", "周铭磊", "田子月", "梁京琦", "梁云涛", "张文平", "刘琨", "陈实", "胡燕", "黄超", "潘可", "杨君", "胡黎黎", "陈小龙", "丁雪超", "董超", "段飞", "高子东", "韩锐", "何升", "何钊", "李航", "刘杨", "龙江峰", "聂孟平", "欧梦成", "任朝维", "孙纯松", "唐强", "王涛", "韦刚", "杨伟", "杨燕", "赵飞", "李阳", "孙峤", "吴龙春", "肖峰", "张玉婷", "周莹", "刘柯", "曹东", "吴波", "邵郑翰", "李萍", "王娜", "张莉", "樊艳", "李倩", "岑峥玉", " 代玲", "彭煜", "庄小娜", "晏笑婷", "贾丽", "舒琴", "陈浩", "陈星君", "侯福梅", "司马汪洋", "许楠", "周帆", "毕嘉", "甘元军甘工", "白雪峰", "边缘", "曹晶莹", "符亮", "万维立", "王瑶", "赵琴", "周斌", "陈震", "杜利平", "冯火军", "何伏崧", "胡景", "赖真强", "雷珂", "李波刚", "刘浩", "罗恒", "聂学良", "蒲军", "时兴", "宋兵", "夏雨亮", "杨清柳", "张佳强", "张明忠", "赵茂森", "蔡文杰", "韩勇", "何丽萍", "刘涛", "吕靓婷", "许超明", "张强", "朱星海", "测试刘柯", "黄琴", "雷超", "雷娇", "刘蓉", "刘宇", "刘柯"];
var usernames = ["李安平"];

var index = 0;
var alldata = [];
var redo = 0;
var indexy = 0;

sendRequest();


function getdetail() {

    if (indexy >= alldata.length) {
        var abc = "<style>table,table tr th, table tr td { border:1px solid #0094ff; }    </style>"
        abc += "<table width=100%>";
        for (var i = 0; i < alldata.length; i++) {

            var temp = "<tr>";
            temp += "<td>" + alldata[i].name + "</td><td>" +
                alldata[i].id + "</td><td>" +
                alldata[i].flowid + "</td><td>" +
                alldata[i].starttime + "</td><td>" +
                alldata[i].status + "</td><td> <iframe width=1500px height=400px src=" + alldata[i].id + "_"+alldata[i].flowid + ".html ></iframe></td>"; //+
            // alldata[i].detais + "</td>";

            temp += "</tr>"
            abc += temp;

        }
        abc += "</table>"
        console.log(abc);

        var dt = new Date();
        var filename = dt.toFormat("YYYYMMDDHH24MISS") + ".html";

        var file = path.join(__dirname, "data/" + filename);

        fileHelper.writetoFile(abc, file, false, function(file) {
                console.log(file + "写完了");
            }

        )

        return;
    } else {

        try {
            requestdetails.setinfo(alldata[indexy].flowid, alldata[indexy].id);
            console.log(alldata[indexy].flowid, alldata[indexy].id);
            requestdetails.myRequest(function(err, body) {
                    if (!err) {
                        alldata[indexy].detais = body;
                        fileHelper.writetoFile(body.replace("charset=gbk",""), path.join(__dirname, "data/" + alldata[indexy].id + "_" + alldata[indexy].flowid + ".html"), false, function(file) {

                            indexy++;
                            redo = 0;
                            getdetail();

                        });

                } else {
                    redo++;
                    getdetail();
                }
            })
    } catch (err) {
        console.log(err);
        redo++;
        getdetail();
    }
}

}



function getdetail1() {


    var abc = "<style>table,table tr th, table tr td { border:1px solid #0094ff; }    </style>"
    abc += "<table width=100%>";
    for (var i = 0; i < alldata.length; i++) {

        var temp = "<tr>";
        temp += "<td>" + alldata[i].name + "</td><td>" +
            alldata[i].id + "</td><td>" +
            alldata[i].flowid + "</td><td>" +
            alldata[i].starttime + "</td><td>" +
            alldata[i].status + "</td><td> <iframe width=1500px height=400px src=" +
            "http://221.236.156.77:88/general/workflow/list/print/index.php?actionType=view&MENU_FLAG=&RUN_ID=" + alldata[i].id + "&PRCS_KEY_ID=&FLOW_ID=" + alldata[i].flowid + "></iframe></td>"; //+
        // alldata[i].detais + "</td>";

        temp += "</tr>"
        abc += temp;

    }
    abc += "</table>"
    console.log(abc);

    var dt = new Date();
    var filename = dt.toFormat("YYYYMMDDHH24MISS") + ".html";

    var file = path.join(__dirname, "data/" + filename);

    fileHelper.writetoFile(abc, file, false, function(file) {
            console.log(file + "写完了");
        }

    )



}



function sendRequest() {


    if (redo > 10) {
        console.log("index = " + index + "redo = " + redo);
    }
    if (index >= usernames.length) {

        console.log("我已经完成了所有工作");
        console.log(alldata);
        redo = 0;
        //index = 0;
        getdetail();

        /*
        var abc = "";
        for (var i = 0; i < alldata.length; i++) {
            var temp = alldata[i].name + "," + alldata[i].id + "," + alldata[i].flowid + "," + alldata[i].starttime + "," + alldata[i].status + "," +
                "http://221.236.156.77:88/general/workflow/list/print/index.php?actionType=view&MENU_FLAG=&RUN_ID=" + alldata[i].id + "&PRCS_KEY_ID=&FLOW_ID=" + alldata[i].flowid +
                "\r\n";
            abc += temp;

        }
        console.log(abc);

        var dt = new Date();
        var filename = dt.toFormat("YYYYMMDDHH24MISS") + ".csv";

        var file = path.join(__dirname, "data/" + filename);

        fileHelper.writetoFile(abc, file, false, function(file) {
            console.log(file + "写完了");
        })

	*/

        return;
    } else {

        kaoqinbase.setUserName(usernames[index]);
        console.log("index = ", index, "username = ", usernames[index]);

        try {

            kaoqinbase.sendMyRequest(function(err, data) {
                if (!err) {
                    console.log(JSON.stringify(data));
                    for (var i = data.length - 1; i >= 0; i--) {
                        // console.log(i + "--" + data[i]);
                        alldata.push(data[i]);
                    }

                    index++;
                    redo = 0;

                    sendRequest();
                } else {
                    sendRequest();
                    redo++;
                }
            });
        } catch (error) {

            redo++;

        }
    }
}