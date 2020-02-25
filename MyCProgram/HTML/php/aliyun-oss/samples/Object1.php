<?php
require_once __DIR__ . '/Common.php';

include '../../process/base.php';
header('Content-Type: text/html; charset=utf-8');
use OSS\OssClient;
use OSS\Core\OssException;

$bucket = Common::getBucketName();
$ossClient = Common::getOssClient();
if (is_null($ossClient)) exit(1);
//******************************* Simple usage ***************************************************************

// Upload the in-memory string (hi, oss) to an OSS file
try{

	// Uploads a local file to an OSS file
$result = $ossClient->uploadFile($bucket, "wfg/Bucket.php", __FILE__);
}
catch(Exception  $e){
	Common::println($e);
}
try{
	$path = getUrlParam("path");
	//echo "$path".$path ."<br />";
}
catch(Exception $e){
	echo $e;
}


listObjects($ossClient, $bucket);


function listObjects($ossClient, $bucket)
{
	print("<a href='http://91sc.top/aliyun-oss/samples/Object1.php?path=成信实验小学/二年级八班/'> 二年级八班根目录 /</a> <br />");
	$prefix = '成信实验小学/二年级八班/';
	$path = getUrlParam("path");
	if($path!=null){
		$prefix = $path;
	}		
    print ("当前目录：".$prefix ."<br />");
    $delimiter = '/';
    $nextMarker = '';
    $maxkeys = 1000;
    $options = array(
        'delimiter' => $delimiter,
        'prefix' => $prefix,
        'max-keys' => $maxkeys,
        'marker' => $nextMarker,
    );
    try {
        $listObjectInfo = $ossClient->listObjects($bucket, $options);
    } catch (OssException $e) {
        printf(__FUNCTION__ . ": FAILED\n");
        printf($e->getMessage() . "\n");
        return;
    }
    //print(__FUNCTION__ . ": OK" . "\n");
    $objectList = $listObjectInfo->getObjectList(); // object list
    $prefixList = $listObjectInfo->getPrefixList(); // directory list
    if (!empty($objectList)) {
		
		
        
        print("文件列表: <br />");
        foreach ($objectList as $objectInfo) {
            //print($objectInfo->getKey() . "<br />");
			//var_dump($objectInfo);
			if(strpos(strtoupper($objectInfo->getKey()),".MP4")>0 || strpos(strtoupper($objectInfo->getKey()),".MOV")>0)
			{
				print( "<video  controls='controls' src='http://xhu218.oss-cn-beijing.aliyuncs.com/".$objectInfo->getKey() ."'></video>");
			}
			else if(strpos(strtoupper($objectInfo->getKey()),".JPG")>0)
			{
				print( "<img src='http://xhu218.oss-cn-beijing.aliyuncs.com/".$objectInfo->getKey() ."' />");
			}
			
        }
    }
    if (!empty($prefixList)) {
        print("文件夹列表: <br />");
        foreach ($prefixList as $prefixInfo) {
           // print($prefixInfo->getPrefix() . "<br />");
			print("<a href='http://91sc.top/aliyun-oss/samples/Object1.php?path=" .$prefixInfo->getPrefix() ."' >" .$prefixInfo->getPrefix() ."</a> <br />");
        }
    }
}
?>

