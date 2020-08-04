var newman = require('newman'); // require newman in your project 
//var Step = require('step');
var async = require('async');
var path = require("path")
var replaceall = require("replaceall");
var dir = "/home/Service/script/";

console.log("start....1")
/*
基础方法
*/

var userpath="";

function login() {
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'http://hive.sobey.com:9023/CMApi/api/basic/account/login',
        headers: {
            'Postman-Token': '5404f408-1976-4332-8e32-69366fba9eb6',
            'cache-control': 'no-cache',
            'sobeyhive-http-tool': 'MLWEB',
            'sobeyhive-http-site': 'S1',
            'sobeyhive-http-system': 'MBH',
            'Content-Type': 'application/json'
        },
        body: '{LOGINNAME:"admin",LOGINPWD:"21232f297a57a5a743894a0e4a801fc3",LOGINSUBSYSTEM:"sys1",LOGINIP:"127.0.0.1"}'
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var b = JSON.parse(body);
        console.log(b.ext.usertoken);
        getuserpath(b.ext.usertoken)
    });

}

function getuserpath(usertoken) {
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://hive.sobey.com:9023/CMApi/api/basic/user/getcurrentuserpath',
        qs: { storagetype: 'nas' },
        headers: {
            'Postman-Token': 'd4e279af-d9b2-4f57-9d97-f252b8f3f1e6',
            'cache-control': 'no-cache',
            'sobeyhive-http-token': usertoken,
            'sobeyhive-http-site': 'S1',
            'sobeyhive-http-system': 'Nebula',
            'Content-Type': 'application/json'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        var b = JSON.parse(body);
        console.log(b.ext.nas[0].path);
        userpath=b.ext.nas[0].path;
        replaceFilePath();
    });

}


//查找字符串
function findString(lookingForString, data) {
    var exc = new RegExp(lookingForString);
    if (exc.test(data))
        return true;
    else
        return false;
}

//产生GUID
function guidGenerator() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

//更新globals.postman_globals.json
function replaceFilePath(obj) {

    flag = 0;

    var fs = require('fs');

    var readable, writable;

    var filepath_guid = guidGenerator();
    //var fcpfilepath_guid = guidGenerator();

    console.log(filepath_guid);
    //console.log(fcpfilepath_guid);	

    var _src = path.join(dir, "sample/myfly.mp4")
    
    var _dst_filepath = "/ext_file_root/hivefiles/sobeyhive/buckets/u-02yb5h378r771w3c/" + filepath_guid + ".mp4"; //"d:\\1.mp4";//
    //var _dst_fcpfilepath = 	"/ext_file_root/hivefiles/sobeyhive/bucket-z/u20002/cmupload/2017-04-21/"+ fcpfilepath_guid +".mp4";


    readable = fs.createReadStream(_src);
    writable = fs.createWriteStream(_dst_filepath);
    readable.pipe(writable);
    //writable = fs.createWriteStream(_dst_fcpfilepath );  
    //readable.pipe( writable );	

    var filepath = "a6c01c60870ab25975885bbe0787f75cwfg4";
    //var fcpfilepath = "0c60189decb5e1e3e8e720ce47c09683";

    console.log("start replace globals.postman_globals.json")
    console.log("`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*");
    fs.readFile(dir + 'Postman Globals.postman_environment.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (findString(filepath, data))
        {
            console.log("find string : " + filepath + " replace with :" + filepath_guid);
            data = data.replace(filepath, filepath_guid);
        }
        //   /wfg/g
        
        
        //   \\172.16.168.202\hivefiles\sobeyhive\buckets\u-02yb5h378r771w3c\
        if (findString("172.16.168.202",data)) 
        {
        	//currentpath=userpath.replace("\\\\","\\\\\\\\\\\\\\\\");
        	userpath1 = replaceall("\\","\\\\\\\\",userpath);
        	userpath2 = replaceall("\\","\\\\",userpath);

        	console.log("userpath = " + userpath);

        	console.log("find string : \\\\\\\\172.16.168.202\\\\hivefiles\\\\sobeyhive\\\\bucket-z\\\\u20011\\\\cmupload\\\\2017-04-21\\\\"+ " replace with :" + userpath1);        	
        	//data = data.replaceall("\\\\\\\\\\\\\\\\172.16.168.202\\\\\\\\hivefiles\\\\\\\\sobeyhive\\\\\\\\bucket-z\\\\\\\\u20011\\\\\\\\cmupload\\\\\\\\2017-04-21\\\\\\\\",currentpath);
        	data = replaceall("\\\\\\\\\\\\\\\\172.16.168.202\\\\\\\\hivefiles\\\\\\\\sobeyhive\\\\\\\\bucket-z\\\\\\\\u20011\\\\\\\\cmupload\\\\\\\\2017-04-21\\\\\\\\",userpath1,data);
        	//data = data.replaceall('data name')("\\\\\\\\\\\\\\\\172.16.168.202\\\\\\\\hivefiles\\\\\\\\sobeyhive\\\\\\\\bucket-z\\\\\\\\u20002\\\\\\\\cmupload\\\\\\\\2017-04-21\\\\\\\\",currentpath);
        	data = replaceall("\\\\\\\\\\\\\\\\172.16.168.202\\\\\\\\hivefiles\\\\\\\\sobeyhive\\\\\\\\bucket-z\\\\\\\\u20002\\\\\\\\cmupload\\\\\\\\2017-04-21\\\\\\\\",userpath1,data);
        	//data = data.replaceall("\\\\\\\\172.16.168.202\\\\hivefiles\\\\sobeyhive\\\\bucket-z\\\\u20011\\\\2017-05-18\\\\",userpath)
        	data = replaceall("\\\\\\\\172.16.168.202\\\\hivefiles\\\\sobeyhive\\\\bucket-z\\\\u20011\\\\2017-05-18\\\\",userpath2,data);
        }

        //if(findString(fcpfilepath,data))
        //	console.log("find string : "+ fcpfilepath+ " replace with :" + fcpfilepath_guid);

        //data = data.replace(fcpfilepath,fcpfilepath_guid);

        fs.writeFile(dir + 'globals.postman_globals1.json', data, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('write globals.postman_globals1.json has finished');
            //obj.finishFlag = true;
            replacePefPath();

        });
    });
}

//更新CMAPI.postman_collection.json
function replacePefPath(obj) {

    var fs = require('fs');
    var readable, writable;

    var fcppef_guid = guidGenerator();
    //var jovepef_guid = guidGenerator();

    console.log(fcppef_guid);
    //console.log(jovepef_guid);

    //var _src_pef =  		"/ext_file_root/hivefiles/sobeyhive/buckets/u-02yb5h378r771w3c/PEF_New_3abaf010db8c4f6686d670610dc92c21.pef";
    var _src_pef = path.join(dir, "sample/64bf9fadc4d64bf5ad161a85e14c2200.pef")
    var _dst_fcppef = "/ext_file_root/hivefiles/sobeyhive/buckets/u-02yb5h378r771w3c/" + fcppef_guid + ".pef";
    //var _dst_jovepef=		"/ext_file_root/hivefiles/sobeyhive/bucket-z/u20240/"+ jovepef_guid +".pef";

    var fcppef_path = "PEF_New_ddc8e707e30c4bef9da150a4ec5b2d95";
    //var jovepef_path = "PEF_New_1c76dc4da95e4df3a037b8be03ebaf71";

    readable = fs.createReadStream(_src_pef);
    writable = fs.createWriteStream(_dst_fcppef);
    readable.pipe(writable);
    //writable = fs.createWriteStream(_dst_jovepef );  
    //readable.pipe( writable );

    console.log("start replace CMAPI.postman_collection1.json")
    console.log("`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*");
    fs.readFile(dir + 'CMAPI.postman_collection.json', 'utf-8', function(err, data) {
        if (err) {
            console.log("111" + err);
        }

        if (findString(fcppef_path, data))
		{
            console.log("find  fcppef_path string : " + fcppef_path + " replace with :" + fcppef_guid);
			data = data.replace(fcppef_path, fcppef_guid);
			userpath1 = replaceall("\\","\\\\\\\\",userpath);
			data = data.replace("\\\\\\\\\\\\\\\\172.16.168.202\\\\\\\\hivefiles\\\\\\\\sobeyhive\\\\\\\\buckets\\\\\\\\u-3ulc5d341cl2tqwr\\\\\\\\",userpath1);
		}
		else
		{
		    console.log("not find..............................")
		}

        //if(findString(jovepef_path,data))
        //	console.log("find string : "+ jovepef_path + " replace with :" + jovepef_guid);

        //data = data.replace(jovepef_path,jovepef_guid);


        fs.writeFile(dir + 'CMAPI.postman_collection1.json', data, function(err) {
            if (err) {
                console.log(err);

            }
            console.log('write CMAPI.postman_collection.json has finished');
            //obj.finishFlag = true;
            autoRun();

        });


    });
}

//自动运行
function autoRun(obj) {
    newman.run({
        collection: require(dir + 'CMAPI.postman_collection1.json'),
        //collection: require(dir+'wfgtest1.postman_collection.json'),

        globals: require(dir + "globals.postman_globals1.json"),
        //environment: require("E:\\近期工作\\API\\11.postman_environment.json"),
        iterationCount: 1,
        delayRequest: 0,
        reporters: ['cli', 'html', 'json', 'junit']
    }, function(err, summary) {
        //if (err) {
        //    throw err; }
        console.log('collection run complete!');
        //console.log(summary.run.failures);
    }).on('start', function(err, args) {
        console.log("running a collection");
    }).on('beforeIteration', function(err, args) {

    }).on('beforeRequest', function(err, args) {

    }).on('beforeIteration', function(err, args) {

    }).on('beforeIteration', function(err, args) {

    }).on('done', function(err, summary) {
        if (err || summary.error) {
            console.error('collection run encountered an error.');
        } else {
            console.log('collection run completed.');
            //obj.finishFlag = true;
            setTimeout(function() { console.log("晶晶，我已经做完了哟\n，您看看对不对，\n不好理解的，找下老王！");
                process.exit(1); }, 30000);


        }
    });
}

function wait() {
    setTimeout(function() { console.log("hello..."); }, 10000);
}


/*
while(true){
	if(flag === 0)
		wait();
	else
		replaceFilePath(replacePefPath(autoRun()));
}
*/

/*
async.series(
  [
    function(callback){
      replaceFilePath();
    },  
    function(callback){
      replacePefPath();
    },
    function(callback){
      autoRun();
    } 
  ]
);
*/




/*
Step(
  function thefunc1(){
	console.log("thefunc1");
	replaceFilePath(this);
	//finishFlag = true;
  },
  function thefunc2(finishFlag){
	console.log("thefunc2");  
    replacePefPath(this);
	//finishFlag = true;
  },
  function thefunc3(finishFlag){
	console.log("thefunc3");
	autoRun(this);
	//finishFlag = true;
  }
);

*/

login();

//replaceFilePath()
//replacePefPath();
//setTimeout(autoRun, 10000);