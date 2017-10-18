

var request = require("request");

var request1 = {

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


            if (error) {
				 console.log(error);
            	//throw new Error(error);
            }
           
            try {


                if (typeof callback == "function")
                    
                  callback(url,body);
            } catch (err) {
                console.log(err);
                callback(url,null);
                //console.log(body);
            }


        });
    }
   

};
module.exports = request1;