require('date-utils');

/*
var date = new Date();
date.addMonths(1);
var d = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
console.log(d);


var a = ["1","2","3"];
var b = ["4","5"];
a = a.concat(b);

for(var i =0;i<a.length;i++){
	console.log(a[i]);
}

console.log(Math.random());


console.log(__dirname);

var data = [];
data.push("1");
*/

var txt = "001030,天弘云端生活优选,THYDSHYX,2017-10-17,0.7940,0.7940,-0.1383,-1.2438,-0.5386,6.3915,3.6013,8.1155,-9.8035,,9.1259,-20.60,2015-03-17,1,-20.6,1.50%,0.15%,1,0.15%,1";

/*
2017-10-17,//日期
	1.6240,单位净值
	2.5680,累计净值
	-0.1230,日增长率
	-0.3070,近一周
	 0.9950,近一月
	 10.9289,近三月
	 2.6549,近6月
	 18.5401,近一年
	 25.3086,近二年
	 207.7897,近三年
	 12.8561,今年来
	 208.4053,成立来

jijing_Code,
jijing_Name,
jijing_Mask,
jijing_Date
jijing_unitValue
jijing_totalValue
jijing_daliyIncreaseRate
jijing_lastWeek
jijing_lastMonth
jijing_last3Month
jijing_last6Month
jijing_las1year
jijing_last2year
jijing_last3year
jijing_sinceThisYear
jijing_sinceestablish


var obj = txt.split(",");

var data  = {

jijing_Code:obj[0],
jijing_Name:obj[1],
jijing_Mask:obj[2],
jijing_Date:obj[3],
jijing_unitValue:obj[4],
jijing_totalValue:obj[5],
jijing_daliyIncreaseRate:obj[6],
jijing_lastWeek:obj[7],
jijing_lastMonth:obj[8],
jijing_last3Month:obj[9],
jijing_last6Month:obj[10],
jijing_las1year:obj[11],
jijing_last2year:obj[12],
jijing_last3year:obj[13],
jijing_sinceThisYear:obj[14],
jijing_sinceestablish:obj[15],


};
console.log(JSON.stringify(data));
console.log(data);


console.log(1,2,3);




var data = [1,2,-5,-4,3,-1,-2,-3];
data.sort(function(b, a) {
            return a - b;
        });

console.log(JSON.stringify(data));

*/

//console.log(parseInt(""));
var s = "1";
var b = (s==""?0:s);
console.log(b);


var a = 1.24555;
console.log(a.toFixed(2));