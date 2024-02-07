<?php

if ($_FILES["file"]["error"] > 0)
{
	echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
}
else
{
	//echo "Upload: " . $_FILES["file"]["name"] . "<br />";
	//echo "Type: " . $_FILES["file"]["type"] . "<br />";
	//echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
	//echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
	/*
	if (file_exists("upload/" . $_FILES["file"]["name"]))
	  {
		echo $_FILES["file"]["name"] . " already exists. ";
	  }
	else
	*/		
	{
		move_uploaded_file($_FILES["file"]["tmp_name"],
		"upload/" . $_FILES["file"]["name"]);
		//echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
		sleep(3);
		Header("HTTP/1.1 303 See Other"); 
		Header("Location: http://47.88.53.184/examples/uploadPhoto1.php?"."name=/var/www/html/examples/uploadfile/upload/".$_FILES["file"]["name"]); 
		exit; //from www.w3sky.com 
	}
}
  
?>