<?php


require_once __DIR__ . '/Common.php';

include '../../process/base.php';
header('Content-Type: text/html; charset=utf-8');
use OSS\OssClient;
use OSS\Core\OssException;

class ossHelper{
	
	function putobj($object,$path){

		$bucket = Common::getBucketName();
		$ossClient = Common::getOssClient();
		if (is_null($ossClient)) exit(1);
		$content = file_get_contents($path);
		$options = array();
		try{
				$ossClient->putObject($bucket, $object, $content, $options);
		}
		catch(Exception $e){
			throw $e;
		}
	}
}	