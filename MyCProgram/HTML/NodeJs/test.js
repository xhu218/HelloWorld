


var sd = require('silly-datetime');
var num = 0;
var I = setInterval(function(){
	num++;
	if(num==100)
	{
		clearInterval(I);
	}
	var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(time);

},1000);



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