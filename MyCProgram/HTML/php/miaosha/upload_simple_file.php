
<?php
include './base.php';
require_once './php-sdk-7.2.1/autoload.php';

// 引入鉴权类
use Qiniu\Auth;

// 引入上传类
use Qiniu\Storage\UploadManager;
$userid = getUrlParam("userid");
$operation = getUrlParam("operation");
$jjcode = getUrlParam("jjcode");

$url = "http://xhu219.s3.91sc.top/data/".$userid.".json";
echo $url;
$file = file_get_contents($url);
//echo $file;



echo "---------------------------------------------------------------";
$t = str_replace("var users = ","",$file);
//echo $t;



$jjlist=json_decode($t);
//echo $jjlist;

//echo "jj length = ".$jjlist.length;

file_put_contents("./wfg.txt", "hello wfg");

$filePath=$userid.".json";
echo $filePath;

//echo "wfgwfg".$jjlist[0][0];

if($operation=="add"){
	$temp = ["jijing_Code"=> $jjcode];
	Array_push($jjlist,$temp);
	  file_put_contents('./'.$filePath,"var users = ".json_encode($jjlist));
}
else if($operation =="sub"){
	$newjjlist=Array();
	//console.log($jjlist.length);
	for($i=0;$i<count($jjlist);$i++){
		//var_dump($jjlist[$i]);
		echo $jjlist[$i]->jijing_Code;
	    //echo json_encode($jjlist[$i]);
		echo "-----------------------------------------------";
		if($jjcode!=$jjlist[$i]->jijing_Code)
		{

			
			Array_push($newjjlist,$jjlist[$i]);
		
			}
	}
	  file_put_contents('./'.$filePath,"var users = ".json_encode($newjjlist));
}





// 构建鉴权对象
$auth = new Auth($accessKey, $secretKey);

// 上传到七牛后保存的文件名
$key = 'data/'.$userid.".json";

// 生成上传 Token
$token = $auth->uploadToken($bucket,$key);

// 要上传文件的本地路径



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

