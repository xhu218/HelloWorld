var fs = require("fs");
var iconv = require('iconv-lite');  

var file = "E:\\分析日志\\2017\\2017-12\\2017-12-16\\CSN\\CSN 系统再次出现播出事故 MYSQL20171216\\PlayoutTerminal\\playout__dbc__airlogin.2017.12.16.01.15.51.log";
var data = fs.readFileSync(file);

console.log(iconv.decode(data, 'utf-8'));