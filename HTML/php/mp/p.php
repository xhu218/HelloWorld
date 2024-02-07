663<?php

include '../process/base.php';
include_once  "fileHelper.php";
include_once "messageHelper.php";
include_once "mysqlHelper.php";
include_once "translateHelper.php";
include_once "../baidu/tts.php";
include_once "materialHelper.php";
include_once "../weibo/p.php";
include_once "../weibo/libweibo-master/saetv2.ex.class.php";
include_once('../weibo/libweibo-master/config.php');

include_once('../aliyun-oss/samples/o.php');


function writelog($content){
	$fHelper = new fileHelper("a");
	$fHelper->writelog($content);
}

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
	
	else if ($array["MsgType"]== "image"){
		$msg = $array["PicUrl"];
	}
	else if ($array["MsgType"]== "video"){
		$msg = $array["MediaId"];	
	}else{
		$msg = "not find";	
	}
	
	
	if($array["FromUserName"] == "ogDSQwGI_df009fxwuEbH7hqxOWw"){
		if($array["MsgType"] == "text"){
		
			$wb = new weibo();
			$wb->share($msg);
		}else if($array["MsgType"] == "image"){	
			$c = new SaeTClientV2( WB_AKEY , WB_SKEY ,access_token);
			$c->share("查看http://www.baidu.com",$msg);
			writelog('$msg = ' .$msg);
		}
	}




	$result = null;
	if($array["MsgType"] == "text" || $array["MsgType"] == "event"){	
		
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

		$result = $mHelper->generate(		
		$array["FromUserName"],
		$array["ToUserName"],
		$array["CreateTime"],
		$content,
		$array["MsgId"]);		

	}	
	else if($array["MsgType"]== "voice"){	
		$baidu = new baidu();
		$baidu->GetAudio($content,"data/".$array["MsgId"].".mp3");
		
		$material = new materialHelper();
		$res = $material->mediaupload("data/".$array["MsgId"].".mp3");
		
		$mediaid=json_decode($res)->media_id;
		
		$result = $mHelper->generate1(
			$array["FromUserName"],
			$array["ToUserName"],		
			$array["CreateTime"],
			$mediaid
			);
	}
	else if($array["MsgType"]== "image"){
		
		$result = $mHelper->generate(		
		$array["FromUserName"],
		$array["ToUserName"],
		$array["CreateTime"],
		"图片我已经上收到，马上给你上传到服务器",
		$array["MsgId"]);
		
		
		$oss = new ossHelper();
		$path = "公众号/".date("Y-m-d")."/" .date('Y-m-dHis') .rand(1,1000).".jpg";
		$oss->putobj($path,$msg);
		
	}
	else if($array["MsgType"]== "video"){
		$result = $mHelper->generate(		
		$array["FromUserName"],
		$array["ToUserName"],
		$array["CreateTime"],
		"视频我已经上收到，马上给你上传到服务器",
		$array["MsgId"]);
		
		$oss = new ossHelper();
		$path = "公众号/".date("Y-m-d")."/" .date('Y-m-dHis') .rand(1,1000).".mp4";
		
		$material = new materialHelper();
		writelog("video = " .$msg);
		$obj = $material->getmaterialurl($msg);
		writelog("video path = ".$obj);
		$oss->putobj($path,$obj);		
	}
	

}catch (Exception $e) {
		$$result = $mHelper->generate1(
			"gh_78bd01a59e00",
			"ogDSQwGI_df009fxwuEbH7hqxOWw",		
			"1581482190",
			$e.Message,
			"123");		
}
echo $result;



































//echo "success";

/*

认证时使用

$echostr = getUrlParam("echostr");
echo $echostr;
*/

/*




*/
