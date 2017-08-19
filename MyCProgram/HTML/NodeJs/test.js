var sd = require('silly-datetime');
var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
console.log(time);


var str = "123wfgabcwfg321";
var tt = str.replace(/wfg/g,'lxx'); 
console.log(tt);