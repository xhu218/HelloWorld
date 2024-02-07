var request = require('request');
var options = {
    'method': 'GET',
    'url': 'http://91sc.top/redirect.php',
    'headers': {
        'url': 'tGZ4/muzn8cVFvB2RGvg+NxA/89svULpMU6gZJuu+y/BVh8ivthBETZGbtp4QFWh9cQZLe4XPpoycImdIGrTEAdpyCGtE6BQ9u0E39U+L1M='
    }
};
request(options, function(error, response) {
    if (error) throw new Error(error);
    var arry = response.body.split('').reverse();

    //console.log(content)

    var mima = "mynameiswfgwhatisyourname";
    var p1 = mima.split("")
    for (var i = p1.length * 2 - 1; i >= 0; i = i - 2) {       
        arry[i] = "";
    }


    var content = new Buffer(arry.join(""), 'base64').toString();
    console.log(content);
});