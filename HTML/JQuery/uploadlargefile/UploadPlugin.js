
(function ($) {
    $.UploadPlugin = function (url, uploadPath, files, callBack, failCallBack) {
        var failNum = 0;
        var fileArr = [];
        var taskCount = 0;
        function Upload(file) {
            if (failNum <= 1000) {//请求失败1000次内继续请求           
                var form = new FormData();
                form.append("data", file.data);
                form.append("name", file.name);
                form.append("total", file.total);
                form.append("index", file.index);
                form.append("uploadPath", uploadPath);
                $.ajax({
                    url: url,

                    type: "POST",

                    data: form,

                    async: true, //异步

                    processData: false, //很重要，告诉jquery不要对form进行处理

                    contentType: false, //很重要，指定为false才能形成正确的Content-Type

                    success: function (idx) {
                       
                            callBack(file);
                       
                        taskCount--;
                    },
                    error: function () {
                        failNum++;
                        Upload(file);
                    }

                });
            }
            else {//错误请求累计超过1000次，上传失败
                failCallBack(file.name);
            }
        }
  
        if (files instanceof Object) {
            var length = files.length;
            for (var i = 0; i < length; i++) {
                var name = Guid.NewGuid().ToString("N")+ files[i].name,
					size = files[i].size,
					shardSize = $("#UploadShardSize").val() * 1024 * 1024 || 2 * 1024 * 1024,
					shardCount = Math.ceil(size / shardSize);
                for (var j = 0; j < shardCount; j++) {
                    var start = j * shardSize,
						end = Math.min(size, start + shardSize);
                    fileArr.push({ data: files[i].slice(start, end), name: name, total: shardCount, index: j + 1 });
                }
            }
           var intervalId = setInterval(function(){
                if (taskCount < 5 && fileArr.length >0) {
                    taskCount++;
                    var file = fileArr.shift();
                    Upload(file);
                }
                if(fileArr.length == 0)
                {
                    clearInterval(intervalId);
                }
            },100);
        }
    }
})(jQuery);





//表示全局唯一标识符 (GUID)。

function Guid(g) {
    var arr = new Array(); //存放32位数值的数组
    if (typeof (g) == "string") { //如果构造函数的参数为字符串
        InitByString(arr, g);
    }
    else {
        InitByOther(arr);
    }

    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function(o) {
        if (o && o.IsGuid) {
            return this.ToString() == o.ToString();
        }
        else {
            return false;
        }
    }

    //Guid对象的标记
    this.IsGuid = function() { return true; }

    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function(format) {
        if (typeof (format) == "string") {
            if (format == "N" || format == "D" || format == "B" || format == "P") {
                return ToStringWithFormat(arr, format);
            }
            else {
                return ToStringWithFormat(arr, "D");
            }
        }
        else {
            return ToStringWithFormat(arr, "D");
        }
    }

    //由字符串加载
    function InitByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
            InitByOther(arr);
        }
        else {
            for (var i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }
    }

    //由其他类型加载
    function InitByOther(arr) {
        var i = 32;
        while (i--) {
            arr.push("0");
        }
    }

    /*
    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} 
    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) 
    */
    function ToStringWithFormat(arr, format) {
        switch (format) {
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                str = str.replace(/,/g, "");
                return str;
            case "B":
                var str = ToStringWithFormat(arr, "D");
                str = "{" + str + "}";
                return str;
            case "P":
                var str = ToStringWithFormat(arr, "D");
                str = "(" + str + ")";
                return str;
            default:
                return new Guid();
        }
    }
}

//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();

//初始化 Guid 类的一个新实例。
Guid.NewGuid = function() {
    var g = "";
    var i = 32;
    while (i--) {

        g += Math.floor(Math.random() * 16.0).toString(16);

    }
    return new Guid(g);
}