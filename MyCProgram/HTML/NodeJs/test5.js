
for (var index = 1; index < 10; index = index *2) {
	//console.log(`同学看\t${index}页\t\t\t我看${index*2}页`);
}



var sum = 0;
var temp = "";
for(var index =1;index<=10;index++){
	sum+=index;
	
    temp += `${index} + `
	console.log(`${temp}  = ${sum}`);
}