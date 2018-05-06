'use strict';

var express = require('express');

var PORT = 8888;

var app = express();



app.get('/:name', function (req, res) {
	res.send('Hello world-1' + req.params.name);
	
	
	var spawn = require('child_process').spawn;
	var free = spawn('/data/run.sh', [req.params.name]); 
	//var free = spawn('free', ['-m']); 
	
	

	// 捕获标准输出并将其打印到控制台 
	free.stdout.on('data', function (data) { 
	console.log('standard output:\n' + data); 
	writefile('standard error output:\n' + data)

	}); 

	// 捕获标准错误输出并将其打印到控制台 
	free.stderr.on('data', function (data) { 
	console.log('standard error output:\n' + data); 
	writefile('standard error output:\n' + data)
	}); 

	// 注册子进程关闭事件 
	free.on('exit', function (code, signal) { 
	console.log('child process eixt ,exit:' + code); 
	writefile('child process eixt ,exit:' + code);
	});
	
	

});







function writefile(msg){
	
	var fs = require("fs");

	console.log("准备写入文件");
	fs.appendFile('/data/input.txt', msg,  function(err) {
	   if (err) {
		   return console.error(err);
	   }
	   console.log("数据写入成功！");
	   console.log("--------我是分割线-------------")
	   console.log("读取写入的数据！");
	   
	   fs.readFile('input.txt', function (err, data) {
		  if (err) {
			 return console.error(err);
		  }
		  console.log("异步读取文件数据: " + data.toString());
	   });
	});
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
