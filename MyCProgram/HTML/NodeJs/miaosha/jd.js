;

var request = require("request");

var jd = {

    "url": "",

    setUrl: function(url) {
        this.options.url = url;
        this.url = url;
        //console.log(this.options.url);
    },

    options: {
        method: 'GET',
        url: '',
    },

    getUrl: function() {
        return this.options.url;
    },





    sendRequest: function(callback) {
        var url = this.url;
        request(this.options, function(error, response, body) {


            if (error) throw new Error(error);
            var pcMiaoShaAreaList = {};
            try {
                var strToJson = function(str) {
                    var json = (new Function("return " + str))();
                    return json;
                }
                var goods = strToJson(body.replace("pcMiaoShaAreaList", ""));

                if (typeof callback == "function")
                    
                  callback(url,goods);
            } catch (err) {
                console.log(err);
                //console.log(body);
            }


        });
    }

};
module.exports = jd;