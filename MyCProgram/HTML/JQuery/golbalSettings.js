var golbalSetting = {

    "CMAPI": "http://172.168.1.1:9023",
    "CM": "CM1",

    "inited":false,

    "init": function() {
        if(this.inited)
            return;

        var ip;
        var port;

        var baseUrlIndex = window.location.href.indexOf("/", 7);
        var baseUrl = window.location.href.substr(0, baseUrlIndex);

        var portIndex = baseUrl.indexOf(":", "7");

        if (portIndex > 0) {
            ip = baseUrl.substr(0, portIndex);
            port = baseUrl.substr(portIndex + 1);
        }

        if (this.CMAPI.indexOf("hive.sobey.com:9023") > 0) {
            this.CMAPI = ip + ":9023";
        }
        if (this.CMAPI.indexOf("hive.sobey.com:9023") > 0) {
            this.CMAPI = ip + ":9023";
        }
        if (this.CMAPI.indexOf("hive.sobey.com:9023") > 0) {
            this.CMAPI = ip + ":9023";
        }
        if (this.CMAPI.indexOf("hive.sobey.com:9023") > 0) {
            this.CMAPI = ip + ":9023";
        }
        this.inited = true;

    }
};
golbalSetting.init();

function loadJs(file) {
    var head = $("head").remove("script[role='reload']");
    $("<scri" + "pt>" + "</scr" + "ipt>").attr({ role: 'reload', src: file, type: 'text/javascript' }).appendTo(head);
};

function reloadAbleJSFn(id, newJS) {
    var oldjs = null;
    var t = null;
    var oldjs = document.getElementById(id);
    if (oldjs) oldjs.parentNode.removeChild(oldjs);
    var scriptObj = document.createElement("script");
    scriptObj.src = newJS;
    scriptObj.type = "text/javascript";
    scriptObj.id = id;
    document.getElementsByTagName("head")[0].appendChild(scriptObj);
};

function loadjscssfile(filename, filetype) {  
    if (filetype  ==  "js") { 
        var fileref  =  document.createElement('script'); 
        fileref.setAttribute("type", "text/javascript"); 
        fileref.setAttribute("src", filename); 
    } else if (filetype  ==  "css") {  
        var fileref  =  document.createElement('link'); 
        fileref.setAttribute("rel", "stylesheet"); 
        fileref.setAttribute("type", "text/css"); 
        fileref.setAttribute("href", filename);     
    } 
    if (typeof fileref  !=  "undefined") { 
        document.getElementsByTagName("head")[0].appendChild(fileref);     
    }  
} ;
