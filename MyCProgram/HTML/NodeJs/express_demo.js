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

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/hb', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end();
})

app.get('/listUsers', function(req, res) {
    console.log(req);
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(data);
    });
})


app.get('/addUser', function(req, res) {
    // 读取已存在的数据
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(data));
    });
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


app.post("/notify", function(req, res) {

    //console.log("1");
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    //res.end(JSON.stringify(req.body.name));
    //console.log(req);
    //res.end(JSON.stringify(req.url));


    res.end("{\"Code\":\"0\"}");
    console.log(req.body);
    //res.end("{\"name\":\"wfg\"}");


})

app.post("/uploadfile", function(req, res) {

    //console.log("1");
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    //res.end(JSON.stringify(req.body.name));
    //console.log(req);
    //res.end(JSON.stringify(req.url));
    writeFile("C:\\Users\\WangFugui\\Desktop\\3-1.txt",JSON.stringify(req.header));
    writeFile("C:\\Users\\WangFugui\\Desktop\\3-1.txt",JSON.stringify(req.body));

    res.end("{\"Code\":\"0\"}");
    console.log(req);


    //res.end("{\"name\":\"wfg\"}");


})


function writeFile(path, content) {
    console.log("path = "+path);
    var fs = require("fs");
    fs.appendFile(path, content, function(err) {
        if (err) {
            console.log("fail" + err)
        } else {
            /*
                    try {

                        //qn.Test1(file.replace("/home/Service/script/",""));
                        qn.Test1(file);
                    } catch (error) { console.log(error); }
*/
            //console.log("写入文件成功 : " + file);
            if (typeof callback == "function") {
                callback(path);
            }
        }
    })
}



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