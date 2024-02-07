/*
    把当前统计出来的request url与postman请求样例做对比
    找出在postman里目前没有的请求URL
*/

var fs = require('fs');
var sd = require('silly-datetime');


var postmanpath = "E:\\Work\\GitHub\\HTML\\NodeJs\\CMAPI.postman_collection.json";
var requesturlpath = "E:\\Work\\GitHub\\HTML\\NodeJs\\request.url";

var time=sd.format(new Date(), 'YYYY-MM-DD HH-mm');
var rpt = "E:\\Work\\GitHub\\HTML\\NodeJs\\result\\url" + time + ".txt";

function findString(lookingForString, data) {
    var exc = new RegExp(lookingForString);
    if (exc.test(data))
        return true;
    else
        return false;

}

var data = fs.readFileSync(postmanpath, 'utf8');

var readline = require('readline'),
    fs = require('fs');
var rl = readline.createInterface({
    input: fs.createReadStream(requesturlpath),
    output: process.stdout,
    terminal: false
});


rl.on('line', function(line) {

	if(!findString(line,data))
	{
        //{"url":"/CMApi/api/entity/program/getfcp7xmlpathformac","file":""}
        fs.appendFile(rpt, "{ \"url\": \"" + line+"\",\"file\":\"\"},\r\n", function(err){  
        if(err)  
            console.log("fail " + err);  
        else  
            console.log("写入文件ok");  
        });  
		console.log("{ \"url\": \"" + line+"\",\"file\":\"\"}");
	}

});
