

var m = require("./mail.js");

m.sendMail('67438964@qq.com','00000000000000000000', 'H0000000000000');

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