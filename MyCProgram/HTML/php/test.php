
<?php

$str='aHR0cHM6Ly9zZWFyY2guamQuY29tL1NlYXJjaD9lbmM9dXRmLTgma2V5d29yZD3jgJDkubAy6YCBMeWQjOasvuOAkeacrOiNieePjee7v+aJi+iGnOaKpOaJi+mcnOaJi+icoeS/nea5v+iEmuiGnOa7i+a2pui2s+iGnOeUt+Wls+Wjq+aJi+aRuOaJi+mDqOaKpOeQhuaJi+iFiiAxMjBn';     //定义字符串 
$a = base64_decode($str); //输出解码后的内容

echo $a;

//header("location: " . $a);
//header("location: " . "http://www.baidu.com?t=1");
exit;
?>