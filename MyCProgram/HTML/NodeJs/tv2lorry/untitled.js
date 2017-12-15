 var fs = require("fs");
 var path = require("path");
 require('date-utils');



 var total = 365 * 10;
 //var total = 3; //365 * 10;
 for (var index = 0; index < total; index++) {
     var dt = new Date().addDays(-index);
     var d = dt.toFormat("YYYY-MM-DD");
     console.log(d);

     var parentFolder = __dirname;

     var child = path.join(parentFolder, d);

     if (!fs.existsSync(child)) {
         fs.mkdirSync(child);

     }
     //var filecount = 3;
     var filecount = 40;
     for (var indexY = 0; indexY < filecount; indexY++) {
         setTimeout((function(child,index,indexY) {
             return function() {
                 var fs1 = require("fs");
                 var filename = null;
                 if(indexY % 4 ==0){
                    filename = path.join(child, indexY.toString()+".mp3");
                 }
                 else if(indexY % 4 == 1){
                  filename = path.join(child, indexY.toString()+".mxf");  
                 }
                 else if(indexY % 4 == 2){
                  filename = path.join(child, indexY.toString()+".avi");  
                 }
                 
                 else if(indexY % 4 == 3){
                  filename = path.join(child, indexY.toString()+".avi");  
                 }
                 
                 console.log(indexY,filename);

                 fs1.writeFile(filename, "hello world "+indexY, function(err) {
                     if (err)
                         console.log(err)
                     else
                         console.log(index,indexY,filename);
                 });
                 
             }
         })(child,index,indexY), 500*index+indexY*10);

     }
 }