
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

var data = [];
for(var index=0;index<100;index++){
	data.push(index);
}

data.forEach(function(item,index){
	setTimeout(()=>{console.log(index);},1000-index);
	//console.log(index);
})