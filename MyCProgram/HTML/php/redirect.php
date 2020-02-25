<?php

include 'process/base.php';


$url = $_SERVER['HTTP_URL'];




$url = decode($cryptkey,$iv,$url);




$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$response = encode1($response);
curl_close($curl);
echo $response;


function encode1($string = '', $skey = 'mynameiswfgwhatisyourname') {
	$strArr = str_split(base64_encode($string));
	//echo "base64 : " .base64_encode($string). " <br />";
	$strCount = count($strArr);
	/*
	foreach ($strArr as $key => $value){
		 echo $key ."     " .$value ."<br />";
	}
	echo "---------------------------------" ."<br />";
	*/
	foreach (str_split($skey) as $key => $value){			
		//echo $key ."     " .$value ."<br />";
		$key < $strCount && $strArr[$key].=$value;
	}
	/*
	echo "---------------------------------" ."<br />";
	foreach ($strArr as $key => $value){
		 echo $key ."     " .$value ."<br />";
	}
	*/
	$content = join('', $strArr);
	$content =  strrev($content);
	//$content = "abcdefg" .$content;
	return $content;
	//return str_replace(array('=', '+', '/'), array('O0O0O', 'o000o', 'oo00o'), $content);
}
