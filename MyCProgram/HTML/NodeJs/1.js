require('date-utils');

function a() {
    var x = (time = null ? 100 : 100)
    console.log(x)
}

//setTimeout(a(),5000);
//a()
//setInterval(a(),5000);

/*

var strdate = "2017 9 07 12:00";
//var d 	 = 
//console.log(d.GetYear());

//console.log(d);


var date = new Date();
//console.log(date.getFullYear() +"/"+ date.getMonth()+"/"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes() +":"+ date.getSeconds());


var dt = new Date(date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + "23:59");
dt.addMonths(1);
dt.addMinutes(5);
//dt = Date.parse(new Date(strdate));
console.log(dt.toFormat("YYYY-MM-DD HH24:MI:SS"));

var wareids = [1, 2, 3, 4, 5];
for (var index = 0; index < wareids.length; index++) {
    console.log(wareids[index]);
    if (index == 2)
        break;
}

*/


for (var i = 0; i < 10; i++) {
    setTimeout((function(i) {
        return function() {
            console.log(i);
        }
    })(i), 0);
}