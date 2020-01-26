663<?php

include '../process/base.php';
include_once  "fileHelper.php";
include_once "messageHelper.php";
include_once "mysqlHelper.php";
include_once "translateHelper.php";
include_once "../baidu/tts.php";
include_once "materialHelper.php";

try{

	$fHelper = new fileHelper("a");
	$txt = $fHelper->writefile();

	$mHelper = new messageHelper();
	$array = $mHelper->extract1($txt);
	if($array["MsgType"] == "text"){
		$msg = $array["Content"];
	}
	else if ($array["MsgType"]== "voice"){
		$msg = $array["Recognition"];
	}
	else if ($array["MsgType"]== "event"){
		$msg = "欢迎词";
		
	}
	
	
	$content="not find";
	$sql = "select * from COMMAND WHERE upper(cmdname) like '%".strtolower($msg)."%' LIMIT 0,1";
	$sqlHelper = new mysqlHelper();
	$data = $sqlHelper->ExcuteScaler($sql);

	if($data!=null && sizeof($data)>0)
	{
		//var_dump($data);		
		$cmdname = $data[0][1];
		$cmddesc = $data[0][2];
		$cmdtype = $data[0][3];
		$cmdcontent = $data[0][4];
		
		if ($cmdtype == "f" ){
			$content = $fHelper->readfile1($cmdcontent);
		}else if ($cmdtype == "c"){
			$content = $cmdcontent;
		}else{
			
			$translate = new translateHelper();
			$lang=$translate->isAllChinese($msg);
			
			if ( $lang ==false )
			{
				$result=$translate->translate($msg,"en","zh");
				$content =  $result['trans_result'][0]["dst"];
			}
			else if  ( $lang == true )
			{
				$result=$translate->translate($msg,"zh","en");
				$content =  $result['trans_result'][0]["dst"];
			}			
		}	
	}
	else
	{	
		$sql = "insert into COMMAND (cmdname) VALUES ('" .str_replace("'","\'",$msg) ."')";
		$sqlHelper->ExcuteScaler($sql);
		$translate = new translateHelper();
		$lang=$translate->isAllChinese($msg);
			
		if ( $lang ==false )
		{
			$result=$translate->translate($msg,"en","zh");				
		}
		else if  ( $lang == true )
		{
			$result=$translate->translate($msg,"zh","en");
		}
		$content =  $result['trans_result'][0]["dst"];		
	}
	
	if($array["MsgType"]=="text" ||  $array["MsgType"]== "event")
	{
	
		$msg = $mHelper->generate(
		
		$array["FromUserName"],
		$array["ToUserName"],
		$array["CreateTime"],
		$content,
		$array["MsgId"]);
		
	}	
	else{
		
		$baidu = new baidu();
		$baidu->GetAudio($content,"data/".$array["MsgId"].".mp3");
		
		$material = new materialHelper();
		$res = $material->mediaupload("data/".$array["MsgId"].".mp3");
		
		$mediaid=json_decode($res)->media_id;
		
		

		$msg = $mHelper->generate1(
			$array["FromUserName"],
			$array["ToUserName"],		
			$array["CreateTime"],
			$mediaid
				);	
		
	}
	

	echo $msg;

}catch (Exception $e) {
	echo $e.Message;	
	}

//echo "success";

/*

认证时使用

$echostr = getUrlParam("echostr");
echo $echostr;
*/

/*




*/
