
/*
var fs = require('fs');
var path = require("path")


fs.stat(path.join(__dirname, 'test-reg.js'), function(err, stats){
 if(err){
  throw err;
 }else{
  console.log(stats);
  console.log(stats.size);
 }
})

*/


function test(num1,num2,num3){

	console.log(num1, num2, num3);
	if(num3 === undefined)
	{
		console.log("undefined.. haha .......");

		console.log(num3+100);
	}

}

function test2()
{

	test(1,2);
	test(1,2,3);
}

test2();