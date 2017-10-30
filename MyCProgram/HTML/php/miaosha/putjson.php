<?php

include 'base.php';

// 生成一个PHP数组
$data = array();
$data[0] = array('1','吴者然','onestopweb.cn');
$data[1] = array('2','何开','iteye.com');
// 把PHP数组转成JSON字符串
$json_string = json_encode($data);
// 写入文件
file_put_contents('test.json', $json_string);
?>