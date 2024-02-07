<?php

session_start();

include_once('libweibo-master/config.php');
include_once('libweibo-master/saetv2.ex.class.php');


$msg="123";
$c = new SaeTClientV2(WB_AKEY,WB_SKEY,$_SESSION['token']['access_token'] );
//if($array["MsgType"]== "image"){
//	var_dump($c->share("图片信息http://www.baidu.com","image/123.jpg"));
//}
//else{
	var_dump($c->share($msg."http://www.baidu.com"));	
//}


