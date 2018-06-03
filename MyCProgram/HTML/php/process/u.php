<?php

header('Content-Type: text/html; charset=utf-8');
include './base.php';
include './mysql.php';

$tool = getUrlParam("tool");

if($tool!=null )
{
	$result = select("select * from APPINFO where appname='". $tool ."'");	
	//var_dump($result);	
	foreach($result as $res)
	{
		echo $res[0] ."_" .$res[1] ."_" .$res[2];
	}
}

?>