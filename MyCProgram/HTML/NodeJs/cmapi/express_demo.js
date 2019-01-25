//express_demo.js 文件
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var fs = require("fs");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})



app.get('/:id', function(req, res) {

    console.log(req.header);
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]
        console.log(user);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(user));
    });
})


app.get('/', function(req, res) {

    console.log(req.header);
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(data));
    });
})


app.get('/CMApi/api/entity/object/getobjectinfo', function(req, res) {



    console.log(req.method); //get
    console.log(req.query.contentid);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    fs.readFile("F:\\hivefiles\\sobeyhive\\buckets\\u-9qk91018621ve3ni\\" + req.query.contentid + ".json", 'utf8', function(err, data) {
        res.end(data);
    });


})





var server = app.listen(9023, function() {

    var host = "127.0.0.1" //server.address().address
    var port = 9023; //server.adress().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})


//添加的新用户数据
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}