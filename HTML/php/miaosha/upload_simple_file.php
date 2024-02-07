
<?php
include './base.php';
require_once './php-sdk-7.2.1/autoload.php';

header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); 

// 引入鉴权类
use Qiniu\Auth;

// 引入上传类
use Qiniu\Storage\UploadManager;

$userid = getUrlParam("userid");
$jjcode = getUrlParam("jjcode");

$url = "http://xhu219.s3.91sc.top/data/".$userid.".json?v=".date("Ymd-His") . '-' . rand(100,999);;
$file = file_get_contents($url);
$t = str_replace("var users = ","",$file);
$jjlist=json_decode($t);


$filePath=$userid.".json"; 



for($i=0;$i<count($jjlist);$i++)
{
	$find = false;
	if($jjcode==$jjlist[$i]->jijing_Code)
	{
		$find = true;	
		
	}		
}
echo "i have find". $find	;
if($find == true)
{
	$newjjlist=Array();
	for($i=0;$i<count($jjlist);$i++)
	{			
		if($jjcode!=$jjlist[$i]->jijing_Code)
		{
			Array_push($newjjlist,$jjlist[$i]);	
		}		
	}
}
else
{
		$temp = ["jijing_Code"=> $jjcode];
		Array_push($jjlist,$temp);
	
}
if($find == true)
{
	file_put_contents($filePath,"var users = ".json_encode($newjjlist));
}
else
{
	file_put_contents($filePath,"var users = ".json_encode($jjlist));
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

