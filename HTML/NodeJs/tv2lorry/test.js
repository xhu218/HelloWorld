var str = "21/01/2014  15:24           111,510 85c3ef2ea9414aefa9959d14dc61bc59_0.bmp";
str = str.replace(/\d{2}\/\d{2}\/\d{4}  \d{2}:\d{2}\W*/,"");
console.log(str);

var str1 = "299904 Archive_8238W299904low_audio1_1612.mp3";
str1 = str1.replace(/\S*\.(.*)$/gi,"$1");
console.log(str1);

var str2 = "abc\t123";
var data = str2.split("\t");
console.log(data);
console.log(data[0].toUpperCase())


var str3 = "wfG";
console.log(str3.toUpperCase())

var data = {"name":1,"name2":2};


for(var a in data){
	console.log(a,data[a]);
}

for(var a in data){
	if(parseInt(data[a])>1)
	{
	console.log(data[a]);	
	}
	
}


var str4 = "abc123456789";
console.log(str4.substr(str4.length-5));