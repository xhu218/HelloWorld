var fslog = require("fs");
require('date-utils');
var path = require("path");


module.exports = function(line, level) {

    try {

        var dt = new Date();
        var line = dt.toFormat("YYYY-MM-DD HH24:MI:SS") + "\t" + line;
        //console.log(line);


        var dt = new Date();
        var filename = dt.toFormat("YYYYMMDDHH24") + ".log";

        if (level == "Error") {
            fslog.appendFile(path.join(__dirname, "log", filename), line + "\n", function(err) {
                if (err) {
                    console.log("fail" + err + line);
                } else {
                    //console.log("写入文件成功 : " + file);
                }

            })
        }
    } catch (err) {
        console.log(err);
    }
}