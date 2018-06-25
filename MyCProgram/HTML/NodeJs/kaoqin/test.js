   var rf = require("fs");
        var data = rf.readFileSync("C:\\Users\\WangFugui\\Desktop\\a.html", "utf-8");
       console.log(data);

       var res = data.match(/<body.*<\/body>/gm);
       	console.log(res); 



       	//<table width="587" tabindex="-1" class="xdLayout" bordercolor="buttontext">