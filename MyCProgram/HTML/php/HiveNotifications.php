<?php


header('Content-type: application/json');

 
$arr = array (
		'code'=>'0',
		'msg'=>null,
		'ext'=>array('mos'=>array("mosID"=>"aircache.newscenter.com",
								  "ncsID"=>"2008R2ENPS8VM")));
//echo (file_get_contents("php://input"));
echo json_encode($arr);
