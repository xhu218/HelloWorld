<?php
include '../process/base.php';

$url='http://j4.dfcfw.com/charts/pic6/720001.png';//图片地址
$url = getUrlParam("url");




function http_get_data($url) {
    //curl_setopt() - 设置 cURL 传输选项
    //curl_getinfo — 获取一个cURL连接资源句柄的信息
    $ch = curl_init ();// 创建一个新 cURL 资源
    curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'GET' );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, false );//FALSE 禁止 cURL 验证对等证书（peer's certificate）。要验证的交换证书可以在 CURLOPT_CAINFO 选项中设置，或在 CURLOPT_CAPATH中设置证书目录。
    curl_setopt ( $ch, CURLOPT_URL, $url );
    ob_start ();
    curl_exec ( $ch );// 抓取 URL 并把它传递给浏览器
    $return_content = ob_get_contents ();
    ob_end_clean ();

    curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
    return $return_content;
}

$return_content = http_get_data($url."?t=".date("Ymdhis"));
/*
$filename = date("YmdHis").rand(1,1000).".jpg";
$fp= @fopen("pic/".$filename,"a"); //将文件绑定到流
fwrite($fp,$return_content); //写入文件
*/
header('Content-type: image/png');
echo $return_content;

