;
(function($) {

    var userlist = [];
    this.getUserNameByUserCode = function(usercode, usertoken) {
        if (userlist.length == 0) {
            console.log("query user");
            $.ajax({
                url: "http://hive.sobey.com:9022/CMApi/api/basic/account/getalluser?usertoken=" + usertoken,
                type: "get",
                async: false,
                dataType: "json",
                crossDomain: true,
                error: function(err) {
                    console.log("get user list error");
                    return "get user list error";
                },
                success: function(data) {
                    if (data.code == "0") {
                        userlist = data.ext;
                        //return userlist[0];
                    }
                }
            });
        }
        if (userlist.length != 0) {
            for (var i = 0; i < userlist.length; i++) {

                if (userlist[i].usercode === usercode) {
                    return userlist[i].loginname;
                }

            }
            return "not find user."
        } else {
            return "get user list failed.";
        }
    };

    this.sayhello = function() {
        alert("hello wfg");
        alert(golbalSetting.CMAPI);
    };

    $(document).ready(function() {
        //初始化的事情，以后做
    });


})(jQuery);
