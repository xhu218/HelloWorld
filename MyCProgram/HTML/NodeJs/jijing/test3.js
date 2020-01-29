var request = require('request');
var fund_mysql = require("./fund_mysql.js");

fund_mysql.getAllFundCode(function(r) {
    r.forEach(function(item,index){

    	console.log(index.FUND_CODE);
    	
    });
});