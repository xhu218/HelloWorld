console.log("start...");
var url = "http://app.fromfactory.club:8000/product_list?q=AMC000409827N";
var str = "ZDV000567029N,牵引绳";
var arr = str.split(",");
//console.log(arr[0], arr[1]);
var request = require('request');
var fs = require("fs");



request({
    url: url,
    json: false
}, function(error, response, users) {

    console.log(response.statusCode);

    if (!error && response.statusCode === 200) {
        //var str = "<img id=\"img_409827\" class=\"img img-responsive lazy\" src=\"http://d3kpm7yklociqe.cloudfront.net/nsr/static/img/lazy_load.png\" data-src=\"http://d1vs5fqeka2glf.cloudfront.net/2d/60/2df3ce7cd4b08a677ac846c725e01460_200x200.jpg\" data-us-price=\"20.12\" data-product-no=\"AMC000409827N\" data-category=\"100003086\"/>";
        var str = users;
        var reg = /data-src=[^\s]*/;
        var res = str.match(reg);
        var imageurl = res[0].replace("data-src=", "");
        console.log(imageurl);

        var reg1 = /data-product-no=[^\s]*/;
        var res1 = str.match(reg1);
        var no = res1[0].replace("data-product-no=", "");
        console.log(no);


        var img = imageurl.replace(/"/g,"");
        console.log(img);
        downloadPic(img,__dirname + "/"+ no.replace(/"/g,"")+".png");




    } else {
        console.log("error...");
    }
});

var downloadPic = function(src, dest){
    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        console.log('pic saved!')
    })
}


var str = "<img id=\"img_409827\" class=\"img img-responsive lazy\" src=\"http://d3kpm7yklociqe.cloudfront.net/nsr/static/img/lazy_load.png\" data-src=\"http://d1vs5fqeka2glf.cloudfront.net/2d/60/2df3ce7cd4b08a677ac846c725e01460_200x200.jpg\" data-us-price=\"20.12\" data-product-no=\"AMC000409827N\" data-category=\"100003086\"/>";


　
//var str = '1223334444';
var reg = /data-src=[^\s]*/;
var res = str.match(reg);
//console.log(res)  //["12", "23", "33", "44", "44"]
//console.log(res[0].replace("data-src=", ""));

var reg1 = /data-product-no=[^\s]*/;
var res1 = str.match(reg1);
//console.log(res1);
//console.log(res1[0].replace("data-product-no=", ""));