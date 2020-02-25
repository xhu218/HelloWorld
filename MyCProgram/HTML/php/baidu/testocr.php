<?php

require_once 'AipOcr.php';

//JSON
header('Content-type: application/json');

// 你的 APPID AK SK
const APP_ID = '18223039';
const API_KEY = 'wDkjcpG4GjtKvP0NoISEg4vt';
const SECRET_KEY = 'lvG1dV4zIKydwxLfcktN3QRYX9EWVTwj';
$client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

$url = "https://91sc.top/13548180218.png";

// 调用通用文字识别, 图片参数为远程url图片
echo json_encode($client->basicGeneralUrl($url)); 













$image = file_get_contents('id.jpg');
$idCardSide = "front";

// 调用身份证识别
$client->idcard($image, $idCardSide);

// 如果有可选参数
$options = array();
$options["detect_direction"] = "true";
$options["detect_risk"] = "false";

// 带参数调用身份证识别
echo json_encode($client->idcard($image, $idCardSide, $options));





$image = file_get_contents('http://91sc.top/baidu/back.jpg');

// 调用银行卡识别
echo json_encode($client->bankcard($image));