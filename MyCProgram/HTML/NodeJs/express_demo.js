//express_demo.js 文件
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
       res.end( data );
   });
})


//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
       res.end( JSON.stringify(data));
   });
})


app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
               res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
       res.end( JSON.stringify(user));
   });
})



var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})