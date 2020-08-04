var replaceall = require("replaceall");
var str = "\\\\172.16.168.202\\hivefiles\\sobeyhive\\buckets\\u-02yb5h378r771w3c\\"
//   var reg = /\\[^\]*/;
var str = replaceall("\\","/",str);
reg = /\/\/[^/]*/
var res1 = str.search(reg);
console.log(res1)   
var res = str.replace(reg,"/ext_file_root");
console.log(res);
