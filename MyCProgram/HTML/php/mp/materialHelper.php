<?php

include_once "tokenHelper.php";

class materialHelper{
	
	function mediaupload($filename)
	{

		$tokenHelper = new tokenHelper();
		$token_response=$tokenHelper->getToken();
		$token_response_obj = json_decode($token_response);
		$token = $token_response_obj->access_token;
		
		$ch = curl_init();
		$post_data = array(
						'a'=>'Post',
						'media' => '@'.$filename
					);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_POST, true);  
		curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch, CURLOPT_POSTFIELDS,$post_data);
		curl_setopt($ch, CURLOPT_URL, 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token='.$token .'&type=voice');
		$info=curl_exec($ch);
		curl_close($ch);
		return $info;   
		//print_r($info);

	}
	
	function getmaterialurl($mediaid){
		
		$tokenHelper = new tokenHelper();
		$token_response=$tokenHelper->getToken();
		$token_response_obj = json_decode($token_response);
		$token = $token_response_obj->access_token;
		
		$url='http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='.$token .'&media_id=' .$mediaid;
		return $url;
	}
}