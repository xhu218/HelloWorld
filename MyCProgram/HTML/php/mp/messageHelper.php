<?php

class messageHelper{
	

 
 function extract1($xmltext)	{
	try {
		$xml_tree = new DOMDocument();
		$xml_tree->loadXML($xmltext);
		
		$ToUserName = $xml_tree->getElementsByTagName('ToUserName');
		$FromUserName = $xml_tree->getElementsByTagName('FromUserName');
		$CreateTime = $xml_tree->getElementsByTagName('CreateTime');
		$MsgType = $xml_tree->getElementsByTagName('MsgType');
		$Content = $xml_tree->getElementsByTagName('Content');
		$MsgId = $xml_tree->getElementsByTagName('MsgId');
		$Recognition=$xml_tree->getElementsByTagName('Recognition');
		$MediaId=$xml_tree->getElementsByTagName('MediaId');
		$PicUrl=$xml_tree->getElementsByTagName('PicUrl');
		
		
		return array(
		"ToUserName"=>$ToUserName->item(0)->nodeValue,
		"FromUserName"=>$FromUserName->item(0)->nodeValue,
		"CreateTime"=>$CreateTime->item(0)->nodeValue,
		"MsgType"=>$MsgType->item(0)->nodeValue,
		"Content"=>$Content->item(0)!=null?$Content->item(0)->nodeValue:null,
		"MsgId"=>$MsgId->item(0)->nodeValue,
		"Recognition"=>$Recognition->item(0)!=null?$Recognition->item(0)->nodeValue:null,
		"MediaId"=>$MediaId->item(0)!=null?$MediaId->item(0)->nodeValue:null,
		"PicUrl"=>$PicUrl->item(0)!=null?$PicUrl->item(0)->nodeValue:null
		);
	} catch (Exception $e) {
		//print $e . "\n";
		return array(ErrorCode::$ParseXmlError, null, null);
	}
}
/*

<xml>
    <ToUserName><![CDATA[gh_78bd01a59e00]]></ToUserName>
    <FromUserName><![CDATA[ogDSQwGI_df009fxwuEbH7hqxOWw]]></FromUserName>
    <CreateTime>1547902953</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[贝]]></Content>
    <MsgId>6648192560979631419</MsgId>
    <Encrypt><![CDATA[4fqmbePwKU1Mr/2Uuf3+zE1hlu/ToyQGnbWkq9k7fEDgc5A72VqBS4ipJpJm0CVD/LbKuCY5ywMLqXbwt4h+5kaWmX0r3Rl+7aap9UpItwwyBKmIeiCSnBmbUh/S97aO2TT/xyHUCL1lEfMEEJW8wy/WK/wP2U9gT6Vw/UKs9pOBlVY4cPyvVhTPzcoBbeSRvfT5ZPEwAUa0Ano28Rssp9O4vjlgJtFB+eHZHPdbPA8YBumhKHeCl/wFSL+pkp5+FgbRHmxCx2w69WapN+6IEraLvs0wwkfxg+EpZMZQWg6egKRi18E8CfWatKeXECWoRow+QHqkWyK0dyR3T+aiIiSydktwDDlLsdurRs+QcF3aZ48mEH7HVdGHzQxgxjqrtZM2UXqHyrrpcGf+giOgs4KiC92KoLT3T6mYKiHUB3Q=]]></Encrypt>
</xml>




*/
 function generate($ToUserName,$FromUserName,$CreateTime,$Content,$MsgId){
		$format = "<xml>
    <ToUserName><![CDATA[%s]]></ToUserName>
    <FromUserName><![CDATA[%s]]></FromUserName>
    <CreateTime>%s</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[%s]]></Content>
    <MsgId>%s</MsgId>
    
</xml>";
		return sprintf($format, $ToUserName,$FromUserName,$CreateTime,$Content,$MsgId);
	}



/*

<xml>
    <ToUserName><![CDATA[gh_78bd01a59e00]]></ToUserName>
    <FromUserName><![CDATA[ogDSQwGI_df009fxwuEbH7hqxOWw]]></FromUserName>
    <CreateTime>1549184885</CreateTime>
    <MsgType><![CDATA[voice]]></MsgType>
    <MediaId><![CDATA[ki-D7jyt-j8eiRJE67AHsk0CdhSM7DfrmAUwl6dFaBSb2Piaa6iObes0CAERixrI]]></MediaId>
    <Format><![CDATA[amr]]></Format>
    <MsgId>6653698416532520960</MsgId>
    <Recognition><![CDATA[你好。]]></Recognition>
    <Encrypt><![CDATA[AU033NKxxpIiDSheKA+YlU/+xdYqkT8wa9UIztEBp3BlrOldb+Uun36zqWij9JpcSKHLGdYQOheAnFRdmhZFkaSMDNg36S3YB6a84UxYjzCmSHlgbbxWb3ZkW/EkBWMXMOGmCstQMSbEgHcxItzTkSUl6iumPSa55i1aYw191z9sf7hwU5RIRI18UIic1RVeS8Ph0uJfVWsrUuaZ5rtu7G2nR10jF9ORD65cFAOr4tsMQcNyTO/ijzUYU187PpfQKmyGlXpi4+lii5xOtw3Jbfqx7YS9TCfQmoAZGgE89SuAEfVlHeBk74qiqO/Wana4PqJJO3prfm2XjektdRD8gKsySdaEYrKB8anGz9wQPJrBU4XvZ3WpKLT0pWcWX0AP2EIutd1enLwvEKpigpM3lBn6mMyTFuzeKucXH/K7bfYGjqp7/p1TTrSJA+wTFapSSoJGUDvBKsZEd6TtoB6O4Md5gymef1zlEdVZp6cQjo5BOLZSKhlFskEET/oO5BPnScjn2u5qWZW+zdr70ogM4JV/msroJY1w47RhxNmz0qSlYksBvdEhuPRl5eWM8iZZgsgfgDQduTHEQbM04zw03tjNJQVHE5HrqUhGMx7Ttv0U4ZP0wXph8DJ6JxOTWs9H]]></Encrypt>
</xml>

*/	
 function generate1($ToUserName,$FromUserName,$CreateTime,$MediaId){
		$format = "<xml>
    <ToUserName><![CDATA[%s]]></ToUserName>
    <FromUserName><![CDATA[%s]]></FromUserName>
    <CreateTime>%s</CreateTime>
    <MsgType><![CDATA[voice]]></MsgType>
	<Voice><MediaId><![CDATA[%s]]></MediaId></Voice> 
</xml>";
		return sprintf($format, $ToUserName,$FromUserName,$CreateTime,$MediaId);
	}	
	
}

