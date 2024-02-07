<?php
header('Content-Type: text/html; charset=utf-8');
$content = "大家好";

    /**
     * 简单对称加密算法之加密
     * @param String $string 需要加密的字串
     * @param String $skey 加密EKY
     * @return String
     */
    function encode($string = '', $skey = 'wenzi') {
        $strArr = str_split(base64_encode($string));
		echo "base64 : " .base64_encode($string). " <br />";
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
        return str_replace(array('=', '+', '/'), array('O0O0O', 'o000o', 'oo00o'), join('', $strArr));
    }

    /**
     * 简单对称加密算法之解密
     * @param String $string 需要解密的字串
     * @param String $skey 解密KEY
     * @return String
     */
    function decode($string = '', $skey = 'wenzi') {
        $strArr = str_split(str_replace(array('O0O0O', 'o000o', 'oo00o'), array('=', '+', '/'), $string), 2);
		/*
		foreach ($strArr as $key => $value){
			 echo $key ."     " .$value ."<br />";
		}
		*/
		
        $strCount = count($strArr);
        foreach (str_split($skey) as $key => $value)
            $key <= $strCount && $strArr[$key][1] === $value && $strArr[$key] = $strArr[$key][0];
        return base64_decode(join('', $strArr));
    }

    echo '<pre>';
    echo "string : " . $content . " <br />";
    echo "encode : " . ($enstring = encode($content)) . '<br />';
    echo "decode : " . decode($enstring);
	
	
	
	
	
	