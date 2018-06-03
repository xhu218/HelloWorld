<?php
include './base.php';
include './mysql.php';

$host = getUrlParam("host");
$time = getUrlParam("time");
$tool = getUrlParam("tool");
$view = getUrlParam("view");


if($host!=null && $tool !=null)
{
	insert($host,date("Y-m-d h:i"),$tool);
}
if($view !=null && $view!="")
{
	$result = select('select * from USEINFO');	
	foreach($result as $res)
	{
		echo $res[0] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$res[1] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$res[2] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$res[3] ."</br>";
	}
	//var_dump($result);
}

echo "OK";

?>