<?php
include_once  "p.php";
header('Content-type:text/html;charset=utf-8');
$data=urlencode('send中文演示');
echo $data;
echo'<br>';
echo urldecode($data);

$weibo = new weibo();
//$weibo->share("qqq");


$str= '微博abc';
$needle= '微博';
$pos = strpos($str, $needle);
echo '$pos='.$pos;
if($pos ===0){
	echo "ok";
}
echo substr($str,6);
	