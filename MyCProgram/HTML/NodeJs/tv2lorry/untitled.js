 var fs = require("fs");
 var path = require("path");
 require('date-utils');



 var total = 365 * 10;
 var total = 3;
 var files = [];

 function Getfiles() {

     //var total = 3; //365 * 10;
     for (var index = 0; index < total; index++) {
         var dt = new Date().addDays(-index);
         var d = dt.toFormat("YYYY-MM-DD");
         console.log(d);

         var parentFolder = path.join(__dirname, "files");

         var child = path.join(parentFolder, d);

         if (!fs.existsSync(child)) {
             fs.mkdirSync(child);

         }
         var filecount = 40;
         var filecount = 4;

         for (var indexY = 0; indexY < filecount; indexY++) {

             var filename = null;
             if (indexY % 4 == 0) {
                 filename = path.join(child, indexY.toString() + ".mp3");
             } else if (indexY % 4 == 1) {
                 filename = path.join(child, indexY.toString() + ".mxf");
             } else if (indexY % 4 == 2) {
                 filename = path.join(child, indexY.toString() + ".mp4");
             } else if (indexY % 4 == 3) {
                 filename = path.join(child, indexY.toString() + ".avi");
             }

             files.push(filename);


         }
     }
 }
 var index = 0;

 function CreateFile() {

     var fs = require("fs");
     console.log(index ,files[index]);
     fs.writeFile(files[index], files[index], function(err) {
         if (err) {
             console.log("fail" + err)
         } else {
             index++;
             //console.log(index, files[index]);
             if (index < files.length)
                 CreateFile();
         }
     });
 }
 Getfiles();
 CreateFile();