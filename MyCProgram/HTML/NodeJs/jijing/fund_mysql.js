require('date-utils');
var writelog = require("./writelog.js");

var $host = 'mysql.91sc.top';
var $user = 'qdm170526179';
var $password = 'Pass2word';
var $database = 'qdm170526179_db';


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

                console.log(d, item.Stocks.length);

                for (var i = 0; i < item.Stocks.length; i++) {

                    var addSql = "INSERT INTO `FUND_STOCK` (`FUND_CODE`, `FUND_NAME`, `STOCK_CODE`, `STOCK_NAME`, `HowMany`, `INCREASE`, `UPDATEDATE`) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    var addSqlParams = [item.jijing_Code, item.jijing_Name, item.Stocks[i].StockCode, item.Stocks[i].StockName, parseFloat(item.Stocks[i].HowMany.replace("%", "")), parseFloat(item.Stocks[i].Increase), d];
                    //var addSqlParams = [item.jijing_Code, item.jijing_Name, item.Stocks[i].StockCode, item.Stocks[i].StockName, 1, 1,d];
                    connection.query(addSql, addSqlParams, function(err, result) {
                        if (err) {
                            writelog('[INSERT ERROR] - ' + err + JSON.stringify(item), "Error");
                            return;
                        }


                        console.log('INSERT ID:', result.insertId);
                        //console.log('INSERT ID:', result);

                    });
                }

                connection.end();

            }, 200, data[i]);
        }
    },

    insertall: async function(data) {

        function autoRetry(func, retryMax) {
            retryNum = 0;
            let funcName = func.toString().match(/function (\w+)\(/)[1];
            return funcR = function() {
                let params = arguments;
                return new Promise((resolve, reject) => {
                    func(...params).then(result => {
                        resolve(result);
                    }).catch(err => {
                        if (retryNum < retryMax) {
                            retryNum++;
                            console.warn(`[autoRetry] Catched error when ${funcName}() : ${err.message}. Retry ${retryNum} time...`);
                            resolve(funcR(...params));
                        } else {
                            reject(err);
                        }
                    });
                });
            };
        };


        function insert(fund) {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {

                        console.log("insert in to mysql " + fund.jijing_Code);
                        var dt = new Date();
                        var d = dt.toFormat("YYYY-MM-DD");
                        //var d = '2017-12-02';

                        var addSql = "INSERT INTO `FUND` (`FUND_CODE`, `FUND_NAME`, `FUND_UNITVALUE`, `FUND_TOTALVALUE`, `FUND_DALIYINCREASE`, `FUND_LASTWEEK`, `FUND_LASTMONTH`, `FUND_LAST3MONTH`, `FUND_LAST6MONTH`, `FUND_LASTYEAR`, `FUND_LAST2YEAR`, `FUND_LAST3YEAR`, `FUND_LASTTHISYEAR`, `FUND_SINCECONSTRUCT`, `FUND_DATE`,`jijing_last3year_sort`,`jijing_last2year_sort`,`jijing_last1year_sort`,`jijing_last6Month_sort`,`jijing_last3Month_sort`,`jijing_lastMonth_sort`,`jijing_lastWeek_sort`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
                        var addSqlParams = [fund.jijing_Code, fund.jijing_Name, fund.jijing_unitValue, fund.jijing_totalValue, fund.jijing_daliyIncreaseRate, fund.jijing_lastWeek, fund.jijing_lastMonth, fund.jijing_last3Month, fund.jijing_last6Month, fund.jijing_last1year, fund.jijing_last2year, fund.jijing_last3year, fund.jijing_sinceThisYear, fund.jijing_sinceestablish, d, fund.jijing_last3year_sort, fund.jijing_last2year_sort, fund.jijing_last1year_sort, fund.jijing_last6Month_sort, fund.jijing_last3Month_sort, fund.jijing_lastMonth_sort, fund.jijing_lastWeek_sort];

                        connection.query(addSql, addSqlParams, function(err, result) {

                            if (err) {
                                writelog('[INSERT ERROR] - ' + err + result + JSON.stringify(fund), "Error");
                               return reject(err);
                            } else {
                                return resolve(fund);
                            }

                        });


                    } catch (err) {
                        return reject(err);
                    }
                }, 10);
            })
        };

        insert = autoRetry(insert, 3);

        var mysql = require('mysql');

        var connection = mysql.createConnection({
            host: $host,
            user: $user,
            password: $password,
            database: $database
        });

        connection.connect();
        console.log("开始连接")

        let synchronous_post = function(r, params) {

            return new Promise(function(resolve, reject) {
                insert(r)
                    .then(r => {
                        console.log('成功返回：');
                        // console.log(r)
                        resolve(r);
                    })
                    .catch(e => {
                        console.log('最后错误：');
                        console.log(e);
                        reject(r);
                    })
            });
        }

        for (var i = 0; i < data.length; i++) {
            console.log("start..." + i);
            await synchronous_post(data[i]);
        }
        console.log("结束连接")
        connection.end();

    },

    insert1: function(item) {

        console.log("insert in to mysql " + item);


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

        var addSql = "insert INTO JJ(`id`,`read`,`write`,`author`,`content`,`time`)VALUES(?,?,?,?,?,?)";
        var addSqlParams = [item.id, item.read, item.write, item.author, item.content, item.time];

        connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
                writelog('[INSERT ERROR] - ' + err, "Error");
                return;
            }

            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
        });

        connection.end();

    }
}


module.exports = fund_mysql;

//fund_mysql.select();
//fund_mysql.insert();