<?php

require_once 'AipNlp.php';

// 你的 APPID AK SK
const APP_ID = '11509996';
const API_KEY = 'rBWrzqlPVkdxqWyyhVac1RMG';
const SECRET_KEY = 'xdKOp2KMcxRjql4HDgpE905baI1uRQ4v';

$client = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

$client->setConnectionTimeoutInMillis(60000);
$client->setSocketTimeoutInMillis(60000);

$text = "百度是一家搞科技公司";

// 调用词法分析
//var_dump($client->lexer($text));
//var_dump($client->ecnet($text));


$text1 = "浙富股份";

$text2 = "万事通自考网";

// 调用短文本相似度
$client->simnet($text1, $text2);

// 如果有可选参数
$options = array();
$options["model"] = "CNN";

// 带参数调用短文本相似度
var_dump($client->simnet($text1, $text2, $options));