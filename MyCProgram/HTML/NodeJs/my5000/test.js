var basemethod = require("./basemethod.js")


////\, /, :, *, ?, ", <, >, |
var path = " ??:wfg\r  \\\///:*?\"<<<<<<<<<>>>>>>"
console.log(path.trim());
basemethod.sayhello();
console.log(basemethod.trim(path));
console.log(basemethod.ltrim(path));
console.log(basemethod.rtrim(path));
console.log(basemethod.filter(path));
