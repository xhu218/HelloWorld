////var arguments = process.argv.splice(3);
//console.log('所传递的参数是：', arguments);
var fs = require("fs")

var total = "";
for (var index = 0; index < 1000000; index++) {
    var str = "insert into dcma_essencemark(recordid,note) values(" + index + ",'wfg');\r\ncommit;\r\n";
    total += str;





}
var filename = "1";
fs.writeFile("E:\\20180307\\" + filename + ".txt", total, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("finished.")
    }
})


//console.log(total);