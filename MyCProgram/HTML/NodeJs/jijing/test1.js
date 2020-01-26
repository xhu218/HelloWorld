var request = require('request');
var fund_mysql = require("./fund_mysql.js");
var options = {
    'method': 'GET',
    'url': 'http://guba.eastmoney.com/list,of519674.html', //http://guba.eastmoney.com/list,of519674.html
    'headers': {}
};

//http://91sc.top/jj.html
request(options, function(error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    var content = response.body;
    var res = content.match(/<div class="articleh([\s\S]*?)<\/div>/g);
    //console.log(res)
    if (res != null) {
        res.forEach(function(item, index) {
            //console.log(item);
            //读
            var i = item.match(/<span class="l1">[\s\S].*?<\/span>/g);
            var read = i[0].replace(/<[^>]+>/g, "");

            //写
            var i = item.match(/<span class="l2">[\s\S].*?<\/span>/g);
            var write = i[0].replace(/<[^>]+>/g, "");
            //作者
            var i = item.match(/<span class="l3">[\s\S].*?<\/span>/g);
            var content = i[0].replace(/<[^>]+>/g, "");
         
            //内容
            var i = item.match(/<span class="l4">[\s\S].*?<\/span>/g);
            var author = i[0].replace(/<[^>]+>/g, "");
            //时间
            var i = item.match(/<span class="l5">[\s\S].*?<\/span>/g);
            var time = i[0].replace(/<[^>]+>/g, "");


            //[item.id,item.read,item.write,item,author,item.content,item.time];
            var item = { "id": "519674", "read": read, "write": write, "author": author, "content": content, "time": '2020-'+time };
            console.log(item);
            fund_mysql.insert1(item);
            console.log("-------------------------------------------------------------")

        })

    }


});