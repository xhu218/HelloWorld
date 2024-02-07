const qiniu = require("./nodejs-sdk-7.1.1/index.js");
const proc = require("process");
const path = require('path');
const fs = require("fs");
var conf =require("./config.js")
Qiniu = {


    Test1: function(filepath) {


        var gradParentFolder = path.resolve(filepath,"../..");

        var bucket = conf.Qiniu.bucket;
        var accessKey = conf.Qiniu.accessKey;//proc.env.QINIU_ACCESS_KEY;
        var secretKey = conf.Qiniu.secretKey;//proc.env.QINIU_SECRET_KEY;
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


        var options = {
            scope: bucket + ":" + filepath.replace(gradParentFolder+"/",""),
            insertOnly: 0

        }
        var putPolicy = new qiniu.rs.PutPolicy(options);

        var uploadToken = putPolicy.uploadToken(mac);
        var config = new qiniu.conf.Config();
        var localFile = filepath;
        //config.zone = qiniu.zone.Zone_z0;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();


        var deleteOps = [];
        //deleteOps.push("data/data.js");
        //deleteOps.push("data/data.js");
        //deleteOps.push("wfg");


        for (var i = 0; i < deleteOps.length; i++) {
            console.log(qiniu.rs.deleteOp(bucket, deleteOps[0]));
        }



        //bytes
        /*
        formUploader.put(uploadToken, "wfg", "hello", null, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }

          if (respInfo.statusCode == 200) {
            console.log(respBody);
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
          }
        });
        */



        //file
        formUploader.putFile(uploadToken, filepath.replace(gradParentFolder+"/",""), localFile, putExtra, function(respErr,
            respBody, respInfo) {
            if (respErr) {
                //throw respErr;
            }

            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });

    }




}

module.exports = Qiniu;