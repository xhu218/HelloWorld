var fs = require('fs');
var fs_rpt = require("fs");
var readline = require('readline');

var fs = require('fs');
var sd = require('silly-datetime');
var time=sd.format(new Date(), 'YYYY-MM-DD HH-mm');

var rpt = "E:\\Work\\GitHub\\HTML\\NodeJs\\result\\rpt"+time+".txt";

var root_path = "e:\\分析日志\\2017\\2017-05\\2017-05-19\\QA";
var searchString = 
[
{ "url": "/CMApi/api/basic/account/testconnect","file":""},
{ "url": "/CMApi/api/entity/notify/notifyupdates","file":""},
{ "url": "/CMApi/api/entity/entityrest/getfileformatinfo","file":""},
{ "url": "/CMApi/api/basic/config/setuserparam","file":""},
{ "url": "/CMApi/api/basic/config/getuserparam","file":""},
{ "url": "/CMApi/api/entity/program/savepgmcensorinfo","file":""},
{ "url": "/CMApi/api/entity/clip/clipstorestr","file":""},
{ "url": "/CMApi/api/entity/process/movementcreatenewclip","file":""},
{ "url": "/CMApi/api/entity/object/getmosidfromclipguid","file":""},
{ "url": "/CMApi/api/basic/account/adduserextendattributes/1","file":""},
{ "url": "/CMApi/api/basic/account/getuserextendattributes/20040","file":""},
{ "url": "/CMApi/api/basic/account/getuserextendattributes/20067","file":""},
{ "url": "/CMApi/api/basic/account/deleteuserextendattributes/1/23275","file":""},
{ "url": "/CMApi/api/sns/presnspublish","file":""},
{ "url": "/CMApi/api/basic/account/deleteuserextendattributes/1/24788","file":""},
{ "url": "/CMApi/api/basic/account/getuserextendattributes/1","file":""},
{ "url": "/CMApi/api/basic/account/updateuserextendattributes/1","file":""},
{ "url": "/CMApi/api/entity/metadatcustom/getcustomfielddetails","file":""},
{ "url": "/CMApi/api/entity/process/archivingmovement","file":""},
{ "url": "/CMApi/api/entity/program/getPremiereExportPath","file":""}

];


function findString(lookingForString, data) {
    var exc = new RegExp(lookingForString);
    if (exc.test(data))
        return true;
    else
        return false;
}


function getAllFiles(root) {
    var res = [],
        files = fs.readdirSync(root);
    files.forEach(function(file) {
        var pathname = root + '\\' + file,
            stat = fs.lstatSync(pathname);

        if (!stat.isDirectory())
        {
            if(file.indexOf("WebApi.CMApi_Message")>-1 && file.indexOf(".log")>-1)
            {
                res.push(pathname);
            }
        } else
        {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res
}
var files = getAllFiles(root_path);



for (var file_index in files) 
{
    console.log(file_index + " / " + files.length );
    //console.log(".");
    var data = fs.readFileSync(files[file_index], 'utf8');
    var hasfinished = true;
    for(var searchIndex in searchString)
    {
        if(searchString[searchIndex].file=="") hasfinished = false;  
        var findIndex = data.indexOf(searchString[searchIndex].url);     
        if (searchString[searchIndex].file=="" &&  findIndex >-1)
        {   
            console.log(files[file_index] + "\n" + searchString[searchIndex].url);            
            searchString[searchIndex].file = files[file_index];

            fs_rpt.appendFile(rpt, "-----------------------------------------------------------------------------------------\n"+
                files[file_index] + "\n" + searchString[searchIndex].url + "\n" + data.substr(findIndex-100,2000) + "\n", function(err) {
                if (err)
                    console.log("fail " + err);
                else
                    console.log(files[file_index] + "\n" + searchString[searchIndex].url);
            });

        }
    }
    if(hasfinished)break;
}
console.log("i have finished the job")



