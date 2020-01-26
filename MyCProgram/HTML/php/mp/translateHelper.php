<?php

class translateHelper
{
	

/***************************************************************************

 * Copyright (c) 2015 Baidu.com, Inc. All Rights Reserved
 * 
**************************************************************************/



/**
 * @file baidu_transapi.php 
 * @author mouyantao(mouyantao@baidu.com)
 * @date 2015/06/23 14:32:18
 * @brief 
 *  
 **/

 
 /*
 var appid = '2015063000000001';
var key = '12345678';
 */

#header('Content-Type: text/html; charset=utf-8');
 
#define("CURL_TIMEOUT",   10); 
#define("URL",            "http://api.fanyi.baidu.com/api/trans/vip/translate"); 
#define("APP_ID",         "20171113000094764"); //替换为您的APPID
#define("SEC_KEY",        "xtn9F6n95AO2eKmsq9Uw");//替换为您的密钥

 public   $CURL_TIMEOUT=10;
 public   $URL="http://api.fanyi.baidu.com/api/trans/vip/translate";
 public   $APP_ID="20171113000094764";
 public   $SEC_KEY="xtn9F6n95AO2eKmsq9Uw";

#echo "hello wfg";

#$q = getUrlParam("query");
#echo $q;

#echo translate($q,"en","zh");

#echo "<pre>";print_r(translate($q,"en","zh"));echo "<pre>";


//加密
function buildSign($query, $appID, $salt, $secKey)
{/*{{{*/
    $str = $appID . $query . $salt . $secKey;
    $ret = md5($str);
    return $ret;
}/*}}}*/



/**
     *判断姓名是否全是中文
     */
function isAllChinese($str){
        //新疆等少数民族可能有·
        if(strpos($str,'·')){
            //将·去掉，看看剩下的是不是都是中文
            $str=str_replace("·",'',$str);
            if(preg_match('/^[\x7f-\xff]+$/', $str)){
                return true;//全是中文
            }else{
                return false;//不全是中文
            }
        }else{
            if(preg_match('/^[\x7f-\xff]+$/', $str)){
                return true;//全是中文
            }else{
                return false;//不全是中文
            }
        }
}


/*
function ischinese($s){
 
        $allen = preg_match("/^[^/x80-/xff]+$/", $s);   //判断是否是英文
        $allcn = preg_match("/^[".chr(0xa1)."-".chr(0xff)."]+$/",$s);  //判断是否是中文
        if($allen){  
              return 'allen';  
        }else{  
              if($allcn){  
                   return 'allcn';  
              }else{  
                   return 'encn';  
              }  
        }  
               
}
*/

//翻译入口
function translate($query, $from, $to)
{
    $args = array(
        'q' => $query,
        'appid' => $this->APP_ID,
        'salt' => rand(10000,99999),
        'from' => $from,
        'to' => $to,

    );
    $args['sign'] = $this->buildSign($query, $this->APP_ID, $args['salt'], $this->SEC_KEY);
    $ret = $this->call($this->URL, $args);
    $ret = json_decode($ret, true);
    return $ret; 
}


//发起网络请求
public function call($url, $args=null, $method="post", $testflag = 0, $timeout = 10, $headers=array())
{/*{{{*/
    $ret = false;
    $i = 0; 
    while($ret === false) 
    {
        if($i > 1)
            break;
        if($i > 0) 
        {
            sleep(1);
        }
        $ret = $this->callOnce($url, $args, $method, false, $timeout, $headers);
        $i++;
    }
    return $ret;
}/*}}}*/

public function callOnce($url, $args=null, $method="post", $withCookie = false, $timeout = CURL_TIMEOUT, $headers=array())
{/*{{{*/
    $ch = curl_init();
    if($method == "post") 
    {
        $data = $this->convert($args);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_POST, 1);
    }
    else 
    {
        $data = convert($args);
        if($data) 
        {
            if(stripos($url, "?") > 0) 
            {
                $url .= "&$data";
            }
            else 
            {
                $url .= "?$data";
            }
        }
    }
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    if(!empty($headers)) 
    {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }
    if($withCookie)
    {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $_COOKIE);
    }
    $r = curl_exec($ch);
    curl_close($ch);
    return $r;
}/*}}}*/

public function convert(&$args)
{/*{{{*/
    $data = '';
    if (is_array($args))
    {
        foreach ($args as $key=>$val)
        {
            if (is_array($val))
            {
                foreach ($val as $k=>$v)
                {
                    $data .= $key.'['.$k.']='.rawurlencode($v).'&';
                }
            }
            else
            {
                $data .="$key=".rawurlencode($val)."&";
            }
        }
        return trim($data, "&");
    }
    return $args;
}/*}}}*/



//解析URL参数
public function parseUrlParam($query){
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
public function setUrlParams($cparams, $url = ''){
  $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
  $query = isset($parse_url['query']) ? $parse_url['query'] : '';
  $params = parseUrlParam($query);
  foreach( $cparams as $key => $value ){
    $params[$key] = $value;
  }
  return $parse_url['path'].'?'.http_build_query($params);
}

//获取URL参数
public function getUrlParam($cparam, $url = ''){
    $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
    $query = isset($parse_url['query']) ? $parse_url['query'] : '';
    $params = parseUrlParam($query);
    return isset($params[$cparam]) ? $params[$cparam] : '';
}

public function urlsafe_b64decode($string) {
   $data = str_replace(array('-','_'),array('+','/'),$string);
   $mod4 = strlen($data) % 4;
   if ($mod4) {
       $data .= substr('====', $mod4);
   }
   return base64_decode($data);
}

public function sayHello( $string){
  echo "hello " . $string;
}



	
}