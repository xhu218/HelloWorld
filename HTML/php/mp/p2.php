<?php


$encryptMsg="<xml>
    <ToUserName><![CDATA[gh_78bd01a59e00]]></ToUserName>
    <FromUserName><![CDATA[ogDSQwGI_df009fxwuEbH7hqxOWw]]></FromUserName>
    <CreateTime>1547906368</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[中国]]></Content>
    <MsgId>6648207228292947263</MsgId>
    <Encrypt><![CDATA[bDpBBpGtqWu6hpCzESXJLzfhqEhHfCk9Ai37sC5bjLoHJ38A2xNoOojl+Cjeoosm9UN9QZCVSAsuCdXils5Yc0FXrXCq5OD06VjwVGQkcPd9YtBtnkwWRHrEss3Pzh/ujQb1N4odyVnqYadVDpmtek/A7tLVrBEm4YHzDFNzn96fEKf5/vyWzIGCuCImohFiSggCzGqbr9KkeMcwuubbN2vtyDTC1Nf2GEAyZCCZ4wU9TDm7+KlNzw7PR3xe3TwwUUd+lYFRa+1RkZXR6Hpb2xyROt4hFqmQ4b0R6w5gKDAXlSaKjUXeJAWVKS1za3Nz51TysB1dPnNmQ81+m93De1lKz+89ge+Vdlv3n47jA1ZeR3nGq8CSeTjqCQoMS/bbH0oBI8jXplRDXLUiTl1A7QgSeAwc8QwcR9utUJupxqs=]]></Encrypt>
</xml>";


function extract1($xmltext)
{
	try
	{
	$xml_tree = new DOMDocument();
	$xml_tree->loadXML($xmltext);
	$array_e = $xml_tree->getElementsByTagName('ToUserName');
	$array_s = $xml_tree->getElementsByTagName('FromUserName');
	$encrypt = $array_e->item(0)->nodeValue;
	$msg_sign = $array_s->item(0)->nodeValue;
	
	return array(0, $encrypt, $msg_sign);
	}	catch (Exception $e) {
			//print $e . "\n";
			return array(ErrorCode::$ParseXmlError, null, null);
		}
	
}

$a=extract1($encryptMsg);
echo "<pre>";print_r($a);echo "<pre>";
var_dump($a);
echo $a[0];
echo $a[1];
echo $a[2];


?>