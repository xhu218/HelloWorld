<?php
echo "wfg";
//$arr = [{"name"=>"wfg","age"=>12},{"name"=>"lxx","age"=>13}];
//var_dump($arr);

$arr1=["name"=>"wfg","age"=>12];
//var_dump($arr1);

$arr2 = [];
array_push($arr2, $arr1);
//var_dump($arr2);

echo serialize($arr2);

?>
