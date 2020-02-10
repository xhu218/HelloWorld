var path = require("path");
var config = require('./config')
var fund_mysql = require("./fund_mysql.js");
var crypto = require('crypto');
var writelog = require("./writelog.js");

jijingbase = {

    sayHello: function() {
        console.log("hello...");
    },
    WritetoFile: function(alllist) {
        var top = 20;
        var dt = new Date();
        var d = dt.toFormat("YYYY-MM-DD"); //dt.toFormat("YYYY-MM-DD HH24 MI SS");
        console.log(d);
        console.log("start...");
        var file = require("./fileHelper.js");


        //var rootDir = path.join(__dirname, "Data");
        var rootDir = path.join(config.config.basepath, "data");

        //All List



        var allDict = new Array();
        for (var i = alllist.length - 1; i >= 0; i--) {

            allDict[alllist[i].jijing_Code] = alllist[i];
            //console.log(alllist[i]);
        }
        //Last3Year

        var last3year = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_last3year) - parseFloat(b.jijing_last3year);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last3year_sort = i;

        }

        //Last2Year
        var last2year = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_last2year) - parseFloat(b.jijing_last2year);
        });
        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last2year_sort = i;
        }


        //Last6Month

        var last6Month = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_last6Month) - parseFloat(b.jijing_last6Month);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last6Month_sort = i;
        }
        //Last3Month

        var last3Month = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_last3Month) - parseFloat(b.jijing_last3Month);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last3Month_sort = i;
        }

        //LastMonth

        var lastMonth = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_lastMonth, null, "\t") - parseFloat(b.jijing_lastMonth);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_lastMonth_sort = i;
        }

        //LastWeek

        var lastWeek = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_lastWeek) - parseFloat(b.jijing_lastWeek);
        });


        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_lastWeek_sort = i;
        }

        //Last1Year

        var last1year = alllist.sort(function(b, a) {
            return parseFloat(a.jijing_last1year) - parseFloat(b.jijing_last1year);
        });

        for (var i = 0; i < alllist.length; i++) {
            allDict[last3year[i].jijing_Code].jijing_last1year_sort = i;
        }


        var data = [];
        for (var i = 0; i < alllist.length; i++) {
            data.push(allDict[alllist[i].jijing_Code]);

        }
        try {

            fund_mysql.insertall(data);
        } catch (error) { writelog(error, "Error"); }

        file.writetoFile("var good = " + JSON.stringify(data, null, "\t"), path.join(rootDir, d + ".json"), false);
        //file.writetoFile(JSON.stringify(d, null, "\t"), path.join(rootDir, "AllList", d + ".json"), false);

        function isInList(item, list) {

            for (var i = list.length - 1; i >= 0; i--) {
                if (item == list[i].jijing_Code) {
                    return true;
                }
                return false;
            }
        }

        writelog("i have finished...");


    },


  


    decode: function(secretdata) {

        var cryptkey =  crypto.createHash('sha256').update('__tazai_wolf__key').digest();

        var iv = '1234567890000000';

        decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
            decoded = decipher.update(secretdata, 'base64', 'utf8');

        decoded += decipher.final('utf8');
         //encoded = encoded.replace(/_/g,"-");
        //encoded = encoded.replace(/\//g,"+");
        return decoded;
    },

    encode: function(cleardata) {

        var cryptkey =  crypto.createHash('sha256').update('__tazai_wolf__key').digest();

        var iv = '1234567890000000';

        encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
            encoded = encipher.update(cleardata, 'utf8', 'base64');

        encoded += encipher.final('base64');
        //encoded = encoded.replace(/-/g,"_");
        //encoded = encoded.replace(/\+/g,"/");

        return encoded;
    },

   
    b64enc: function(data) {
        var b = new Buffer(data, 'binary');
        return b.toString('base64');
    }
}

module.exports = jijingbase;