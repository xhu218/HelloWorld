var felixmail = require("./felixemail.js");
/*
console.log(process.execPath)
console.log(__dirname)
console.log(process.cwd())



    function test1() {
        console.log("hello");
        if (test2())
            console.log("true");
        else
            console.log("false");

    }

    function test2() {
        var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var arr2 = [1, 2, 3, 4, 5];

        var flag = arr1.length;

        arr1.forEach(function(itemX, indexX) {

            arr2.forEach(function(itemY, indexY) {
                console.log(indexX, indexY);
                if (indexX == 2 && indexY == 3) {
                    flag = true;

                }
            });
            console.log("current flag = " + flag);
            if (flag === false)
                return false;
        });

    }

    //test1();

    */


/*
var mail = require("./mail.js");
var str = "我开始工作了哈";
mail('67438964@qq.com', '开始工作', str);
*/


var config = [{service: 'Hotmail', user: 'xhu218@hotmail.com', pass: 'Pass2word321'}, {service: 'Hotmail', user: 'xhu218@hotmail.com', pass: 'Pass2word321'} ];
//var conf = ["a","b"];

felixmail.init();


//console.log(config[0].service);
var str = "一个重要的事情";
felixmail.sendMail('xhu218@163.com', '真的很重要哟', str);