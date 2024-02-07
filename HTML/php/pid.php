<?php
include 'process/base.php';


$contentid = getUrlParam("contentid");
$in = getUrlParam("in");
$out = getUrlParam("out");
$token = getUrlParam("token");
$system = getUrlParam("system");
$tool = getUrlParam("tool");




	echo "contentid = " .$contentid ."<br />";
	echo "in = " .$in  ."<b> (unit : frame, null if all the clip will export) </b> <br />";
	echo "out = " .$out ."<b>(unit : frame,null if all the clip will export )</b> <br />";
	echo "token = " .$token ." <b>the token will used for apigateway </b><br />";
	echo "system = " .$system ."<br />";
	echo "tool = " .$tool ."<br />";




?>