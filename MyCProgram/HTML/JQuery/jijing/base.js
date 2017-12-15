 function getUrlParam(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
     var r = window.location.search.substr(1).match(reg); //匹配目标参数
     if (r != null) return unescape(r[2]);
     return "67438964@qq.com"; //返回参数值
 }

  // 对Date的扩展，将 Date 转化为指定格式的String  
 // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
 // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
 Date.prototype.Format = function(fmt) { //author: meizz   
     var o = {
         "M+": this.getMonth() + 1, //月份   
         "d+": this.getDate()-1, //日   
         "H+": this.getHours(), //小时   
         "m+": this.getMinutes(), //分   
         "s+": this.getSeconds(), //秒   
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
         "S": this.getMilliseconds() //毫秒   
     };
     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var k in o)
         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
     return fmt;
 }

 var time1 = new Date().Format("yyyy-MM-dd");
 var goods = [];

 $(document).ready(function() {
     var baseurl ="http://xhu219.s3.91sc.top/";
     //var baseurl = "";
     var user = getUrlParam("user")
     console.log(user)

     //var time1 = "2017-11-19-top100";
     loadScript(baseurl + "data/" + user + ".json?t=" + Math.random(), function() { //get all the select item

         loadScript(baseurl + "data/" + time1 + ".json?t=" + Math.random(), function() { //get all the select item
             console.log(users.length);
             for (var i = 0; i < users.length; i++) {
                 for (var j = 0; j < good.length; j++) {
                     if (users[i].jijing_Code == good[j].jijing_Code) {
                         good[j].select = true;
                     }
                 }
             }
                
             for (var k = 0; k < good.length; k++) {
                if(k>1000) break;
                 //goods.push(good[k]);
                 Vue.set(goods, k, good[k]);

             }
             loadScript(baseurl + "jj.js?t=" + Math.random(), function() {

             });
         });
     });

 });


 function loadScript(url, callback) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     if (typeof(callback) != "undefined") {
         if (script.readyState) {
             script.onreadystatechange = function() {
                 if (script.readyState == "loaded" || script.readyState == "complete") {
                     script.onreadystatechange = null;
                     callback();
                 }
             };
         } else {
             script.onload = function() {
                 callback();
             };
         }
     }
     script.src = url;
     document.body.appendChild(script);
 }

