<?php

class fileHelper 
{
	

	
	public function readfile1($filepath){
		try
		{
		$file_path = $filepath;
		if(file_exists($file_path)){
			
			$str = file_get_contents($file_path);//将整个文件内容读入到一个字符串中
			$str = str_replace("\r\n","<br />",$str);
			//echo $str;
			return $str;
		}
		else{
			return null;
		}
		}catch(Exception $e)
		{
			return $e.Message;
		}
	}

	public function writefile(){
		
		$myfile = fopen("logs/".date("Y-m-d").".log", "a") or die("Unable to open file!");
		$body = file_get_contents('php://input');
		fwrite($myfile, $body);
		fclose($myfile);
		return $body;
	}
	
	public function writefile1($path,$content){
		
		$myfile = fopen($path, "w") or die("Unable to open file!");
		$body = $content;
		fwrite($myfile, $body);
		fclose($myfile);
		return $body;
	}
}


