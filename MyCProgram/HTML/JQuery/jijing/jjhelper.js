var urls = [
    "./Data/LastWeek.json?t=" + Math.random(),
    "./Data/Last1Month.json?t=" + Math.random(),
    "./Data/Last3Month.json?t=" + Math.random(),
    "./Data/Last6Month.json?t=" + Math.random(),
    "./Data/Last1Year.json?t=" + Math.random(),
    "./Data/Last2Year.json?t=" + Math.random(),
    "./Data/Last3Year.json?t=" + Math.random()

];
var finishcount = 0;

function QueryStatus(url) {

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        timeout: 1000,
        cache: false,
        beforeSend: function() { console.log(url) },
        error: function(err) { console.log(err); },
        success: function(alllist) {

            var data = new Array();
            for (var index = 0; index < alllist.length; index++) {
                data[alllist[index].jijing_Code] = alllist[index];
            }

            do(goods,  data, url);
            do(month1, data, url);

            if (++finishcount == urls.length) {

                console.log(goods);

                for (var index = 0; index < goods.length; index++) {
                    //Vue.set(goods, index, goods[index]);
                }
            }
        }
    });

}


function do(part, data, url) {
    var goods = part;
    for (var x = 0; x < goods.length; x++) {
        var item = goods[x];
        //console.log(x);
        goods[x].jijing_Code == data[item.jijing_Code].jijing_Code;
        goods[x].jijing_unitValue = data[item.jijing_Code].jijing_unitValue;
        goods[x].jijing_totalValue = data[item.jijing_Code].jijing_totalValue;
        goods[x].jijing_daliyIncreaseRate = data[item.jijing_Code].jijing_daliyIncreaseRate;
        goods[x].jijing_lastWeek = data[item.jijing_Code].jijing_lastWeek;
        goods[x].jijing_lastMonth = data[item.jijing_Code].jijing_lastMonth;
        goods[x].jijing_last3Month = data[item.jijing_Code].jijing_last3Month;
        goods[x].jijing_last6Month = data[item.jijing_Code].jijing_last6Month;
        goods[x].jijing_last1year = data[item.jijing_Code].jijing_last1year;
        goods[x].jijing_last2year = data[item.jijing_Code].jijing_last2year;
        goods[x].jijing_last3year = data[item.jijing_Code].jijing_last3year;
        goods[x].jijing_sinceThisYear = data[item.jijing_Code].jijing_sinceThisYear;
        goods[x].jijing_sinceestablish = data[item.jijing_Code].jijing_sinceestablish;
        if (url.indexOf("Week") > 0) {
            console.log("Week");
            goods[x].jijing_lastWeek_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("1Month") > 0) {
            console.log("1Month");
            goods[x].jijing_lastMonth_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("3Month") > 0) {
            console.log("3Month");
            goods[x].jijing_last3Month_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("6Month") > 0) {
            console.log("6Month");
            goods[x].jijing_last6Month_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("1Year") > 0) {
            console.log("1Year");
            goods[x].jijing_last1year_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("Last2Year") > 0) {
            console.log("Last2Year");
            goods[x].jijing_last2year_sort = data[item.jijing_Code].Sort;
        } else if (url.indexOf("Last3Year") > 0) {
            console.log("Last3Year");
            goods[x].jijing_last3year_sort = data[item.jijing_Code].Sort;
        }
    }
}



//var goods = [];//[{"jijing_Code": "161725", "jijing_Name": "招商中证白酒指数分级", "jijing_Mask": "ZSZZBJZSFJ", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.1570", "jijing_totalValue": "1.6880", "jijing_daliyIncreaseRate": "-0.6014", "jijing_lastWeek": 4, "jijing_lastMonth": 14, "jijing_last3Month": 22, "jijing_last6Month": 51, "jijing_last1year": 78, "jijing_last2year": 110, "jijing_last3year": 0, "jijing_sinceThisYear": 76, "jijing_sinceestablish": 80, "Sort": 2 }, {"jijing_Code": "110022", "jijing_Name": "易方达消费行业", "jijing_Mask": "YFDXFHY", "jijing_Date": "2017-11-07", "jijing_unitValue": "2.2560", "jijing_totalValue": "2.2560", "jijing_daliyIncreaseRate": "-0.0886", "jijing_lastWeek": 3, "jijing_lastMonth": 12, "jijing_last3Month": 19, "jijing_last6Month": 33, "jijing_last1year": 62, "jijing_last2year": 73, "jijing_last3year": 137, "jijing_sinceThisYear": 59, "jijing_sinceestablish": 125, "Sort": 3 }, {"jijing_Code": "001542", "jijing_Name": "国泰互联网+股票", "jijing_Mask": "GTHLWGP", "jijing_Date": "2017-11-07", "jijing_unitValue": "2.01", "jijing_totalValue": "2.01", "jijing_daliyIncreaseRate": "0.50", "jijing_lastWeek": 1, "jijing_lastMonth": 8, "jijing_last3Month": 16, "jijing_last6Month": 42, "jijing_last1year": 55, "jijing_last2year": 72, "jijing_last3year": 0, "jijing_sinceThisYear": 59, "jijing_sinceestablish": 101, "Sort": 5 }, {"jijing_Code": "241001", "jijing_Name": "华宝海外中国混合(QDII)", "jijing_Mask": "HBHWZGHHQDII", "jijing_Date": "2017-11-06", "jijing_unitValue": "1.8850", "jijing_totalValue": "1.8850", "jijing_daliyIncreaseRate": "1.3986", "jijing_lastWeek": 2, "jijing_lastMonth": 3, "jijing_last3Month": 12, "jijing_last6Month": 32, "jijing_last1year": 54, "jijing_last2year": 53, "jijing_last3year": 33, "jijing_sinceThisYear": 55, "jijing_sinceestablish": 88, "Sort": 7 }, {"jijing_Code": "000742", "jijing_Name": "国泰新经济灵活配置混合", "jijing_Mask": "GTXJJLHPZHH", "jijing_Date": "2017-11-07", "jijing_unitValue": "2.4750", "jijing_totalValue": "2.76", "jijing_daliyIncreaseRate": "0.4057", "jijing_lastWeek": 1, "jijing_lastMonth": 7, "jijing_last3Month": 15, "jijing_last6Month": 40, "jijing_last1year": 52, "jijing_last2year": 66, "jijing_last3year": 185, "jijing_sinceThisYear": 52, "jijing_sinceestablish": 191, "Sort": 10 }, {"jijing_Code": "376510", "jijing_Name": "上投大盘蓝筹", "jijing_Mask": "STDPLC", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.88", "jijing_totalValue": "1.88", "jijing_daliyIncreaseRate": "0.1598", "jijing_lastWeek": 1, "jijing_lastMonth": 9, "jijing_last3Month": 16, "jijing_last6Month": 26, "jijing_last1year": 39, "jijing_last2year": 20, "jijing_last3year": 95, "jijing_sinceThisYear": 45, "jijing_sinceestablish": 88, "Sort": 59 }, {"jijing_Code": "160632", "jijing_Name": "鹏华酒分级", "jijing_Mask": "PHJFJ", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.3620", "jijing_totalValue": "1.4010", "jijing_daliyIncreaseRate": "-0.3658", "jijing_lastWeek": 3, "jijing_lastMonth": 11, "jijing_last3Month": 18, "jijing_last6Month": 37, "jijing_last1year": 51, "jijing_last2year": 64, "jijing_last3year": 0, "jijing_sinceThisYear": 50, "jijing_sinceestablish": 42, "Sort": 11 }, {"jijing_Code": "160222", "jijing_Name": "国泰国证食品饮料行业指数分级", "jijing_Mask": "GTGZSPYLHYZSFJ", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.3111", "jijing_totalValue": "1.9324", "jijing_daliyIncreaseRate": "-0.3950", "jijing_lastWeek": 3, "jijing_lastMonth": 12, "jijing_last3Month": 24, "jijing_last6Month": 41, "jijing_last1year": 53, "jijing_last2year": 70, "jijing_last3year": 119, "jijing_sinceThisYear": 54, "jijing_sinceestablish": 118, "Sort": 9 }, {"jijing_Code": "001703", "jijing_Name": "银华沪港深增长股票", "jijing_Mask": "YHHGSZZGP", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.41", "jijing_totalValue": "1.48", "jijing_daliyIncreaseRate": "0.3559", "jijing_lastWeek": 1, "jijing_lastMonth": 8, "jijing_last3Month": 11, "jijing_last6Month": 33, "jijing_last1year": 48, "jijing_last2year": 0, "jijing_last3year": 0, "jijing_sinceThisYear": 48, "jijing_sinceestablish": 50, "Sort": 16 }, {"jijing_Code": "180012", "jijing_Name": "银华富裕主题混合", "jijing_Mask": "YHFYZTHH", "jijing_Date": "2017-11-07", "jijing_unitValue": "2.8375", "jijing_totalValue": "3.7905", "jijing_daliyIncreaseRate": "0.1447", "jijing_lastWeek": 2, "jijing_lastMonth": 9, "jijing_last3Month": 16, "jijing_last6Month": 36, "jijing_last1year": 53, "jijing_last2year": 69, "jijing_last3year": 160, "jijing_sinceThisYear": 53, "jijing_sinceestablish": 475, "Sort": 8 }, {"jijing_Code": "001878", "jijing_Name": "嘉实沪港深精选股票", "jijing_Mask": "JSHGSJXGP", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.7370", "jijing_totalValue": "1.7370", "jijing_daliyIncreaseRate": "1.2238", "jijing_lastWeek": 2, "jijing_lastMonth": 9, "jijing_last3Month": 12, "jijing_last6Month": 26, "jijing_last1year": 46, "jijing_last2year": 0, "jijing_last3year": 0, "jijing_sinceThisYear": 50, "jijing_sinceestablish": 73, "Sort": 24 }, {"jijing_Code": "163407", "jijing_Name": "兴全沪深300指数(LOF)", "jijing_Mask": "XQHS300ZSLOF", "jijing_Date": "2017-11-07", "jijing_unitValue": "1.8235", "jijing_totalValue": "1.8235", "jijing_daliyIncreaseRate": "0.9243", "jijing_lastWeek": 1, "jijing_lastMonth": 6, "jijing_last3Month": 9, "jijing_last6Month": 25, "jijing_last1year": 32, "jijing_last2year": 31, "jijing_last3year": 104, "jijing_sinceThisYear": 30, "jijing_sinceestablish": 82, "Sort": 120 } ]
for (var index = 0; index < urls.length; index++) {
    var url = urls[index];

    QueryStatus(url);

}