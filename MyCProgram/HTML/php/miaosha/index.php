<?php  


include 'base.php';

//echo getUrlParam("url");
//echo getUrlParam("email");

if(strlen(getUrlParam("url")) ==0){
  echo "the url is null";
}
else{
	$clickInfo = date("Y-m-d h:i:sa") . "\t" . getUrlParam("email") . "\t" . getUrlParam("url") ."\n";
	$filepath = "data/access.log";
	file_put_contents($filepath, $clickInfo,FILE_APPEND);
	header("location: " . getUrlParam("url"));
	exit;
}
?>
