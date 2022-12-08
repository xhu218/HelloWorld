var sum = 1;
var alldata = [];
var mydata={};

function travel(dir, callback) {
    const fs = require('fs')
    var path = require("path")
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}


function readfile(path) {    
   
    //导入fs模块
    const fs = require('fs')

    fs.readFile(path, 'utf-8', function(err, data) {
        //打印失败
        if (err) {
            console.log(err);
        } else {
            //console.log(data);



            var obj = JSON.parse(data);
            //console.log(obj.globalObjects.tweets);
            for (var i in obj.globalObjects.tweets) {

                //console.log(i);
               
                if(alldata.indexOf(i)>-1){
                    continue;
                }

                alldata.push(i);
                console.log("数据长度="+alldata.length);
               

                console.log("sum = ",sum++);
                var userid = obj.globalObjects.tweets[i].user_id;
                //console.log("name:\t\t\t" + obj.globalObjects.users[userid].name);
                console.log("name:\t\t\t" + obj.globalObjects.users[userid].name);
                console.log("screen_name:\t\t\t" + obj.globalObjects.users[userid].screen_name);
                console.log("created_at:\t\t\t" + obj.globalObjects.tweets[i].created_at);
                console.log("full_text:\t\t\t" + obj.globalObjects.tweets[i].full_text);

                console.log("reply_count:\t\t\t" + obj.globalObjects.tweets[i].reply_count);
                console.log("favorite_count:\t\t\t" + obj.globalObjects.tweets[i].favorite_count);
                console.log("retweet_count:\t\t\t" + obj.globalObjects.tweets[i].retweet_count);
                console.log("\n");
            }

        }
    })
}


travel("d:\\2022\\twitter", readfile);
