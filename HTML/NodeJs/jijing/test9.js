//编码
var msg = "hello world";
var msg1 = new Buffer(msg).toString('base64');
console.warn(msg1);

var m1 = msg1.split("");
m1[0] = m1[0]+"w";
m1[1] = m1[1]+"f";
m1[2] = m1[2]+"g";
console.log(m1)

var m2 = m1.join('');
console.log(m2);

var m3 = m2.split("");

var p = "wfg";
var p1 = p.split("")
for (var i = p.length*2 - 1; i >= 0; i=i-2) {
	console.log(i)
	m3[i]="";
}

var m4 = m3.join("");
console.log(m4);



//解码

var msg2 = new Buffer(m4, 'base64').toString();
console.log(msg2);