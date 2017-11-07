const qiniu = require("../index.js");
const proc = require("process");
const path = require('path');
const fs = require("fs");

Qiniu = {


    Test1: function(key) {


        var bucket = "xhu218";//proc.env.QINIU_TEST_BUCKET;
        var accessKey = "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P";//proc.env.QINIU_ACCESS_KEY;
        var secretKey = "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7";//proc.env.QINIU_SECRET_KEY;
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


        var options = {
            scope: bucket + ":" + key,
            insertOnly: 0

        }
        var putPolicy = new qiniu.rs.PutPolicy(options);

        var uploadToken = putPolicy.uploadToken(mac);
        var config = new qiniu.conf.Config();
        var localFile = "/home/Service/script/"+key;
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
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
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

    }




}

module.exports = Qiniu;