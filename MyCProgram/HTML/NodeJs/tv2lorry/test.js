var str = "21/01/2014  15:24           111,510 85c3ef2ea9414aefa9959d14dc61bc59_0.bmp";
str = str.replace(/\d{2}\/\d{2}\/\d{4}  \d{2}:\d{2}\W*/,"");
console.log(str);

var str1 = "299904 Archive_8238W299904low_audio1_1612.mp3";
str1 = str1.replace(/\S*\.(.*)$/gi,"$1");
console.log(str1);

