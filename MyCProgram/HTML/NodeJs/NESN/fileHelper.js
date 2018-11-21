fileHelper = {

    readfromFile: function(file) {
        var rf = require("fs");
        var data = rf.readFileSync(file, "utf-8");
        return data;
    },

    writetoFile: function(content, file, append) {
        var fs = require("fs");
        var path = require("path");
        var parentFolder = path.resolve(file, "..");

        if (!fs.existsSync(parentFolder)) {
            fs.mkdirSync(parentFolder);
        }

        if (append) {
            fs.appendFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {
                    console.log("写入文件成功 : " + file);
                }

            });
        } else {
            fs.writeFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {
                    /*
                    try {
                        
                        //qn.Test1(file.replace("/home/Service/script/",""));
                        qn.Test1(file);
                    } catch (error) { console.log(error); }
*/
                    console.log("写入文件成功 : " + file);
                }

            });


        }
    }
}

module.exports = fileHelper;