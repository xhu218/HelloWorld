<?php


header('Content-type: application/json');

 
 
$arr = array (
		'code'=>0,
		'msg'=>null,
		'ext'=>array('mos'=>array("mosID"=>"aircache.newscenter.com",
								  "ncsID"=>"2008R2ENPS8VM")));
								  
   echo json_encode($arr);							  
   echo file_get_contents("php://input");								  
   $d=file_get_contents("php://input");
   $f=json_decode($d);
   echo ($f->{'mosID'});


$json = '{"foo-bar": 12345}';

$obj = json_decode($json);
print $obj->{'foo-bar'}; // 12345
