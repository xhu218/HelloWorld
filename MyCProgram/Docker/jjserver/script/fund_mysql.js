require('date-utils');
var writelog = require("./writelog.js");

var $host = '172.16.134.31';
var $user = 'mysql';
var $password = 'mysql';
var $database = 'mydatabase';


fund_mysql = {


        select: function() {

            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: $host,
                user: $user,
                password: $password,
                database: $database
            });

            connection.connect();

            connection.query('SELECT count(*)  AS solution from FUND', function(error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
            });

            connection.end();

        },

        insert_fund_stocks: function(data) {

            for (var i = data.length - 1; i >= 0; i--) {
                //console.log(data[i]);
                setTimeout(function(item) {
                        //console.log(item);

                        var mysql = require('mysql');

                        var connection = mysql.createConnection({
                            host: $host,
                            user: $user,
                            password: $password,
                            database: $database
                        });

                        connection.connect();

                        var dt = new Date();
                        var d = dt.toFormat("YYYY-MM-DD")

                        console.log(d,item.Stocks.length);

                        for (var i = 0; i < item.Stocks.length; i++) {

                            var addSql = "INSERT INTO `FUND_STOCK` (`FUND_CODE`, `FUND_NAME`, `STOCK_CODE`, `STOCK_NAME`, `HowMany`, `INCREASE`, `UPDATEDATE`) VALUES (?, ?, ?, ?, ?, ?, ?)";
                            var addSqlParams = [item.jijing_Code, item.jijing_Name, item.Stocks[i].StockCode, item.Stocks[i].StockName, parseFloat(item.Stocks[i].HowMany.replace("%","")), parseFloat(item.Stocks[i].Increase),d];
                            //var addSqlParams = [item.jijing_Code, item.jijing_Name, item.Stocks[i].StockCode, item.Stocks[i].StockName, 1, 1,d];
                            connection.query(addSql, addSqlParams, function(err, result) {
                                if (err) {
                                    writelog('[INSERT ERROR] - '+ err + JSON.stringify(item),"Error");
                                    return;
                                }

                             
                                console.log('INSERT ID:',result.insertId);        
                                //console.log('INSERT ID:', result);
                               
                            });
                        }



                        connection.end();


                    }, 200, data[i]);
        }
    },

    insertall: function(data) {

        for (var i = 0; i < data.length; i++) {
            console.log(i);
            setTimeout(this.insert, 50 * i, data[i]);
            //this.insert(data[i]);
        }
    },

    insert: function(fund) {

        //console.log("insert in to mysql " + JSON.stringify(fund));


        var mysql = require('mysql');

        var connection = mysql.createConnection({
            host: $host,
            user: $user,
            password: $password,
            database: $database
        });

        connection.connect();

        var dt = new Date();
        var d = dt.toFormat("YYYY-MM-DD");
        //var d = '2017-12-02';

        var addSql = "INSERT INTO `FUND` (`FUND_CODE`, `FUND_NAME`, `FUND_UNITVALUE`, `FUND_TOTALVALUE`, `FUND_DALIYINCREASE`, `FUND_LASTWEEK`, `FUND_LASTMONTH`, `FUND_LAST3MONTH`, `FUND_LAST6MONTH`, `FUND_LASTYEAR`, `FUND_LAST2YEAR`, `FUND_LAST3YEAR`, `FUND_LASTTHISYEAR`, `FUND_SINCECONSTRUCT`, `FUND_DATE`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var addSqlParams = [fund.jijing_Code, fund.jijing_Name, fund.jijing_unitValue, fund.jijing_totalValue, fund.jijing_daliyIncreaseRate, fund.jijing_lastWeek, fund.jijing_lastMonth, fund.jijing_last3Month, fund.jijing_last6Month, fund.jijing_last1year, fund.jijing_last2year, fund.jijing_last3year, fund.jijing_sinceThisYear, fund.jijing_sinceestablish, d];

        connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
                writelog('[INSERT ERROR] - '+ err,"Error");
				  writelog('[INSERT ERROR] - '+ err + JSON.stringify(fund),"Error");
                return;
            }

            //console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:',result.insertId);        
            //console.log('INSERT ID:', result);
            //console.log('-----------------------------------------------------------------\n\n');
        });

        connection.end();


    }


}


module.exports = fund_mysql;

//fund_mysql.select();
//fund_mysql.insert();