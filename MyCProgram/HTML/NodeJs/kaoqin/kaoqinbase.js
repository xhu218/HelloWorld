var request = require("request");
var iconv = require('iconv-lite');

var kaoqinbase = {

    options: {
        method: 'POST',
        url: 'http://221.236.156.77:88/general/workflow/query/data/getdata.php',
        encoding: null,
        qs: {
            FLOW_ID: '',
            RUN_ID: '',
            RUN_NAME: '',
            FLOW_QUERY_TYPE: 'ALL',
            TO_ID: '',
            FLOW_STATUS: 'ALL',
            END_TIME: '2018-06-24',
            BEGIN_TIME: '2018-05-01',
            WORK_LEVEL: 'all'
        },
        headers: {
            'postman-token': 'a27f0a5c-4e30-c94c-14e0-3e7f2070e450',
            'cache-control': 'no-cache',
            cookie: 'PHPSESSID=7nfu5c76e12g7nc6arqnida976; USER_NAME_COOKIE=%C1%BA%D0%A1%CF%BC; OA_USER_ID=420; SID_420=72a466ba; searchmore_420=1; query_420_perpage=100; PHPSESSID=7nfu5c76e12g7nc6arqnida976; USER_NAME_COOKIE=%C1%BA%D0%A1%CF%BC; OA_USER_ID=420; SID_420=72a466ba; searchmore_420=1',
            'accept-language': 'zh-CN,zh;q=0.9',
            'accept-encoding': 'gzip, deflate',
            referer: 'http://221.236.156.77:88/general/workflow/query/',
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://221.236.156.77:88',
            accept: 'application/json, text/javascript, */*; q=0.01'
        },
        form: {}
    },
    
    setUserName: function(username) {
        this.options.qs.RUN_NAME = username;
      
    },


    sendMyRequest: function(callback) {
        var username = this.options.qs.RUN_NAME;
        request(this.options, function(error, response, body) {
            if (error) throw new Error(error);
            console.log(body)
            var buf = iconv.decode(body, 'gb2312');
            console.log(buf)
            var obj = JSON.parse(buf);
            //console.log(obj.rows);
            var data = [];
            if(obj.rows!=null )
            for (var index = 0; index < obj.rows.length; index++) {

                data.push({
                    "name":username,
                    "id": obj.rows[index].id,
                    "flowid": obj.rows[index].flow_id,
                    "starttime": obj.rows[index].cell[3],
                    "status": obj.rows[index].cell[5].replace("<font color='green'>","").replace("<font color='red'>","").replace("</font>","")

                })
                /*
                console.log("id  =  ", obj.rows[index].id);
                console.log("flow id = ", obj.rows[index].flow_id);
                console.log("data = ", obj.rows[index].cell[2])
                console.log("start time  = ", obj.rows[index].cell[3])
                console.log("status  = ", obj.rows[index].cell[5])
                console.log("url = ", "http://221.236.156.77:88/general/workflow/list/print/index.php?actionType=view&MENU_FLAG=&RUN_ID=" + obj.rows[index].id + "&PRCS_KEY_ID=&FLOW_ID=" + obj.rows[index].flow_id)
                console.log("\r\n");
*/
            }
            if (typeof(callback) == "function") {
                callback(null, data);
            }
            //console.log(buf);

        });
    }
}

module.exports = kaoqinbase;