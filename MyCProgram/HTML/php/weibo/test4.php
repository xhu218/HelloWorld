 header(“Content-Type: text/html; charset=gb2312")
<?php

	function curl_get_https($url)
	{
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  // 跳过检查
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);  // 跳过检查
		$tmpInfo = curl_exec($curl); 
		curl_close($curl);
		return $tmpInfo;   //返回json对象
	}
 
 
    $url = "https://www.baidu.com";
    // $url = "https://115.159.119.33"; 
    
	$result = curl_get_https($url);
	
    
    var_dump($result);
?>
