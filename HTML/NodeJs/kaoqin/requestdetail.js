var request = require("request");
var iconv = require('iconv-lite');

var requestdetails = {
    options: {
        method: 'GET',
        url: 'http://221.236.156.77:88/general/workflow/list/print.php',
           encoding: null,
        qs: {
            RUN_ID: '37142',
            FLOW_ID: '91',
            FLOW_VIEW: '12345',
            PRCS_ID: '3',
            FLOW_PRCS: '3',
            archive_time: ''
        },
        headers: {
            'postman-token': '0b9dc7ef-4f92-b1be-b09a-1e8d573c8f64',
            'cache-control': 'no-cache',
            cookie: 'FLOW_VIEW_COOKIE=12345; PHPSESSID=7nfu5c76e12g7nc6arqnida976; USER_NAME_COOKIE=%C1%BA%D0%A1%CF%BC; OA_USER_ID=420; SID_420=72a466ba; searchmore_420=1',
      
            referer: 'http://221.236.156.77:88/general/workflow/list/print/index.php?actionType=view&MENU_FLAG=&RUN_ID=37142&PRCS_KEY_ID=&FLOW_ID=91',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'x-devtools-emulate-network-conditions-client-id': '4FA0310AE0948A48C619BF973772C669',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
            'upgrade-insecure-requests': '1'
        }
    },
    setinfo(flowid, run) {

        this.options.qs.RUN_ID = run;
        this.options.qs.FLOW_ID = flowid;

    },
    myRequest: function(callback) {
    	console.log(this.options.qs.FLOW_ID , this.options.qs.RUN_ID)
        request(this.options, function(error, response, body) {
            if (error) throw new Error(error);
            var buf = iconv.decode(body, 'gbk');
            
           //var res = buf.match(/<body[^>]*?>.*?<\/body>/gm);
            callback(null, buf);

        });
    }
}

module.exports = requestdetails;