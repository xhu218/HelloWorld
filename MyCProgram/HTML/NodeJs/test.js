

/*
var sd = require('silly-datetime');
var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
console.log(time);
*/

var str = "123+wf+/ga/bc=============wfg321";
var tt = str.replace('/+/g',"-");   
console.log(tt);



/*
  var schedule = require("node-schedule");

　var rule = new schedule.RecurrenceRule();

　　var times = [];

　　for(var i=1; i<60; i++){

　　　　times.push(i);

　　}

　　rule.second = times;

　　var c=0;
　　var j = schedule.scheduleJob(rule, function(){
     　　 c++;
      　　console.log(c);
　　});

*/