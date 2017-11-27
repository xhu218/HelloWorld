<?php
include 'base.php';
require_once '../php-sdk-7.2.1/autoload.php';

// 引入鉴权类
use Qiniu\Auth;

// 引入上传类
use Qiniu\Storage\UploadManager;

var $userid = getUrlParam("userid");
var $operation = getUrlParam("operation");
var $jjcode = getUrlParam("jjcode");

var $url = "http://xhu219.s3.91sc.top/data/".$userid.".json";
var $file = file_get_contents($url);
var $jjlist=unserialize(file.replace("var users = ",""));

var $filename=$userid."json";
if(operation=="add"){
	Array.Array_push(jjlist,{ "jijing_Code": jijing_Code});
	  file_put_contents('./'.fileName,serialze($jjlist));
}
else if(operation =="sub"){
	var $newjjlist = new ArrayListay();
	for(var i=0;i<jjlist.length;i++){
		if(jijing_Code!=jjlist[i].jijing_Code){
			Array.Array_push(newjjlist,jjlist[i]);
		}
	}
	  file_put_contents('./'.fileName,serialze($newjjlist));
}





// 构建鉴权对象
$auth = new Auth($accessKey, $secretKey);

// 上传到七牛后保存的文件名
$key = 'data\\'.userid."json";

// 生成上传 Token
$token = $auth->uploadToken($bucket,$key);

// 要上传文件的本地路径
$filePath = './php-logo.png';



// 初始化 UploadManager 对象并进行文件的上传。
$uploadMgr = new UploadManager();

// 调用 UploadManager 的 putFile 方法进行文件的上传。
list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);
echo "\n====> putFile result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
