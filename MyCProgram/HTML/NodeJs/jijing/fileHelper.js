fileHelper = {

    readfromFile: function(file) {
        var rf = require("fs");
        var data = rf.readFileSync(file, "utf-8");
        return data;
    },

    writetoFile: function(content, file, append) {
        var fs = require("fs");
        if (append) {
            fs.appendFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {
                    console.log("写入文件成功 : "+file);
                }

            });
        } else {
            fs.writeFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {
                    console.log("写入文件成功 : "+file);
                }

            });
        }
    }
}

module.exports = fileHelper;