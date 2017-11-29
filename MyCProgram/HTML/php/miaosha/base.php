<?php
//解析URL参数
function parseUrlParam($query){
    $queryArr = explode('&', $query);
    $params = array();
    if($queryArr[0] !== ''){
        foreach( $queryArr as $param ){
            list($name, $value) = explode('=', $param);
            $params[urldecode($name)] = urldecode($value);
        }       
    }
    return $params;
}

//设置URL参数数组
function setUrlParams($cparams, $url = ''){
  $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
  $query = isset($parse_url['query']) ? $parse_url['query'] : '';
  $params = parseUrlParam($query);
  foreach( $cparams as $key => $value ){
    $params[$key] = $value;
  }
  return $parse_url['path'].'?'.http_build_query($params);
}

//获取URL参数
function getUrlParam($cparam, $url = ''){
    $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
    $query = isset($parse_url['query']) ? $parse_url['query'] : '';
    $params = parseUrlParam($query);
    return isset($params[$cparam]) ? $params[$cparam] : '';
}

function urlsafe_b64decode($string) {
   $data = str_replace(array('-','_'),array('+','/'),$string);
   $mod4 = strlen($data) % 4;
   if ($mod4) {
       $data .= substr('====', $mod4);
   }
   return base64_decode($data);
}

function sayHello( $string){
  echo "hello " . $string;
}




define('S3_BUCKET', 'xhu218');

define('S3_KEY',    '5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P');
define('S3_SECRET', 'c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7');

// 需要填写你的 Access Key 和 Secret Key
$accessKey = "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P";//getenv('QINIU_ACCESS_KEY');
$secretKey = "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7";//getenv('QINIU_SECRET_KEY');
$bucket = "xhu219";//getenv('QINIU_TEST_BUCKET');

header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); 

?>