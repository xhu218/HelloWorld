<?php
include './base.php';
include './mysql.php';

$email = getUrlParam("email");
$url = getUrlParam("url");

#echo $email .$url;

insertjd($url,date("Y-m-d h:i:sa"),$email);
header("Location: ".$url);

exit;

?>