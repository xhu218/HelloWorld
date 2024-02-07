<?php

require_once 'AipNlp.php';

//JSON
header('Content-type: application/json');

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
//echo json_encode($client->simnet($text1, $text2, $options));



$text = "张飞是一个好人";

// 调用依存句法分析
$client->depParser($text);

// 如果有可选参数
$options = array();
$options["mode"] = 1;

// 带参数调用依存句法分析
//echo json_encode($client->depParser($text, $options));



$word = "张飞";

// 调用词向量表示
//echo json_encode ($client->wordEmbedding($word));


$text = "床前明月光";

// 调用DNN语言模型
$client->dnnlm($text);



$text = "三星电脑电池不给力";

// 调用评论观点抽取
//echo json_encode  ($client->commentTag($text));

// 如果有可选参数
$options = array();
$options["type"] = 13;

// 带参数调用评论观点抽取
echo json_encode  ($client->commentTag($text, $options));











$text = "四川省成就市";

// 调用文本纠错
echo json_encode ($client->ecnet($text));















$content = "麻省理工学院的研究团队为无人机在仓库中使用RFID技术进行库存查找等工作，创造了一种...";

$maxSummaryLen = 10;

// 调用新闻摘要接口
$client->newsSummary($content, $maxSummaryLen);

// 如果有可选参数
$options = array();
$options["title"] = "标题";

// 带参数调用新闻摘要接口
echo json_encode  ($client->newsSummary($content, $maxSummaryLen, $options));
