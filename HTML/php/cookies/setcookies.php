<?php 

$t = time();
setcookie("user", $t, time()+3600);
echo $t;

?>