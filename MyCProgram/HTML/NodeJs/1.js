require('date-utils');

/*
function a() {
    var x = (time = null ? 100 : 100)
    console.log(x)
}


var lastUpdateTime = null;

setInterval(function() {

	console.log("start..."+ lastUpdateTime);

    if (lastUpdateTime != null ){
    	if(lastUpdateTime!= new Date().getDay()){
    		lastUpdateTime = new Date().getDay();	
    		//换天了
    		console.log("change day "+ lastUpdateTime);
    	}
    }else{
    	lastUpdateTime = new Date().getDay();
    	console.log("is null .so "+ lastUpdateTime)
    }
},1000);

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function (input) {
    inputArr.push(input);
    console.log(inputArr[0]);
    console.log(+inputArr[0]);//转化成数字类型
    inputArr = [];

});



//setTimeout(a(),5000);
//a()
//setInterval(a(),5000);

/*

var strdate = "2017 9 07 12:00";
//var d 	 = 
//console.log(d.GetYear());

//console.log(d);



//console.log(date.getFullYear() +"/"+ date.getMonth()+"/"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes() +":"+ date.getSeconds());

*/




/*

var date = new Date();
var dt = new Date(date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + "10:59");
dt.addMonths(1);
dt.addMinutes(5);



//dt = Date.parse(new Date(strdate));
console.log("dt = "+ dt.toFormat("YYYY-MM-DD HH24:MI:SS"));
console.log("date = " + date.toFormat("YYYY-MM-DD HH24:MI:SS"))

console.log(date.compareTo(dt));
console.log(dt.compareTo(date));

if(date.compareTo(dt) ==1)
{
	dt.addDays(1);
}
else{
	console.log("less than");
}
console.log("dt = "+ dt.toFormat("YYYY-MM-DD HH24:MI:SS"));
*/
var wareids = [1, 2, 3, 4, 5];
/*
for (var index = 0; index < wareids.length; index++) {
    console.log(wareids[index]);
    if (index == 2)
        break;
}
*/


wareids.forEach(function(x,y){
    //console.log(x);
    setTimeout((function(){console.log(x)}),1000);
});



/*
for (var i = 0; i < 10; i++) {
    var a = i;

    setTimeout((function(){console.log(a)}),1000);

    setTimeout((function(i) {
        return function() {
            console.log(i);
        }
    })(i), 0);

}
*/
