var request1 = require("./request.js");



module.exports = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {


        var tempStr = "http://www.baidu.com";
        var url = tempStr; // "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=3nzf&st=desc&sd=2016-10-18&ed=2017-10-18&qdii=&tabSubtype=,,,,,&pi=2&pn=50&dx=1&v=0.005266926352829326";
        request1.setUrl(url);
        var goods = request1.sendRequest(function(url, content) {

            var dog = require("./Dog.js");
            var dog1 = new dog('James', 'Bond');
            //console.log(url. content);
            console.log(url);

            dog1.speak();

            console.log("end...");
            return this.firstName + ' ' + this.lastName;




        });


    }
}