<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.weibo.com/2/statuses/share.json?access_token=2.00Nb58MBXCy1YB29dc09eb60IoBo1D&status=sdfadfasdfwww.sina.comdddd",
  //CURLOPT_URL => "https://www.baidu.com",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => array(

  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
