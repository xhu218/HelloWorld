var golbalSetting = {
    "CMAPI": "CMAPI",
    "CM": "CM"
};

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
  
    if (filetype  ==  "js") 
    { 
        var fileref   =  document.createElement('script'); 
        fileref.setAttribute("type", "text/javascript"); 
        fileref.setAttribute("src", filename); 
    }
    else if(filetype  ==  "css") {  
        var fileref  =  document.createElement('link'); 
        fileref.setAttribute("rel", "stylesheet"); 
        fileref.setAttribute("type", "text/css"); 
        fileref.setAttribute("href", filename);     
    } 
    if (typeof fileref  !=  "undefined") { 
        document.getElementsByTagName("head")[0].appendChild(fileref);     
    }  
} ;


