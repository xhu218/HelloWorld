
<?php


include 'base.php';


$email = getUrlParam("email");
$enable = getUrlParam("enable");

echo $email . "unregister successed. thanks";


$filepath = "data\user.json";

$users = file_get_contents($filepath);
$data = json_decode($users, false);

foreach ($data as $value) {
	if($value->email == $email){
		$value->enable = (boolean)$enable;
		$value->lastUpdateTime = date("Y-m-d h:i:sa");
	}
}

$users_str = json_encode($data);
//$users_str = serialize($data);
file_put_contents($filepath, $users_str);


?>