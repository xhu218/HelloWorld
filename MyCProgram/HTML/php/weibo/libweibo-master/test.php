<?php

include '../../process/base.php';
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

session_start();
$content = getUrlParam("content");
$image = getUrlParam("image");

echo $content ."<br />";
echo $image ."<br />";
echo WB_AKEY ."<br />";
echo WB_SKEY  ."<br />";
$access_token="e6073178f435c0aefae7bb59aabe004d";
echo "session = ".$_SESSION['token']['access_token']  ."<br />";


$c = new SaeTClientV2( WB_AKEY , WB_SKEY ,access_token);
var_dump($c->share($content."http://www.baidu.com",$image));

