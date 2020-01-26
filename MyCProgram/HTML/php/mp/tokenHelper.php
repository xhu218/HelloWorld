<?php

include_once  "fileHelper.php";

class tokenHelper{

	function getToken(){
		$now=strtotime('now');
		$file = new fileHelper();
		$content = $file->readfile1("data/expired.dat");
		if($content!=null)
		{
			$data= json_decode($content);
		}
		if( $content==null || ( $content!=null  && $data!=null && $now> $data->expires_in ))
		{
			
			$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx295f5fa6df618a38&secret=e0913cc27088987714ea449e48122816",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
				"Cache-Control: no-cache",
				"Postman-Token: 80d5d400-f19f-4e4e-90cb-a9abd8f254b8"
			  ),
			));

			$response = curl_exec($curl);
			$t=json_decode($response);

			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
			  echo "cURL Error #:" . $err;
			} else {

			  $t->expires_in=strtotime("+$t->expires_in Seconds");
			  echo "$t->expires_in".$t->expires_in;
			  $f = new fileHelper();
			  $response = json_encode($t);
			  $f->writefile1("data/expired.dat",$response);
			  return $response;
			  
			}
		}
		else{
			return $content;
			
		}
	}
	
}



