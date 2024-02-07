<?php

class mysqlHelper
{

	private $hostname 	= 'mysql.91sc.top';
	private $username 	= 'qdm170526179';
	private $database 	= 'qdm170526179_db';
	private $password 	= 'Pass2word';
	private $port 		=  '3306';
	

	
	public function ExcuteNoQuery($sql)	{
		try{
			
			//1.建立连接
			$connect=mysqli_connect($hostname,$username,$password,$database,$port);
			if(!$connect)
			{
				#echo "连接MYSQL错误" ."</br>";
			}
			else
			{
			   #echo "连接数据库成功" ."</br>";
			}
			
			//2.定义sql语句
			
			mysqli_query($connect,'set names utf8');
			//3.发送SQL语句
			$result=mysqli_query($connect,$sql);
			//var_dump($result)
			//4.关闭连接
			mysqli_close($connect);
		}
		catch(Exception  $e)
		{
			#echo $e;
		}
	}

	public function ExcuteScaler($query){
		
		$arr=array();//定义空数组
		try{
			
			//1.建立连接
			$connect=mysqli_connect('mysql.91sc.top','qdm170526179','Pass2word','qdm170526179_db','3306');
			if(!$connect)
			{
				echo "连接MYSQL错误" ."</br>";
			}
			else
			{
				#echo "连接数据库成功" ."</br>";
			}
			
			//2.定义sql语句
			$sql=$query;
			mysqli_query($connect,'set names utf8');
			//3.发送SQL语句
			$result=mysqli_query($connect,$sql);
			

			while($row =mysqli_fetch_array($result)){
				array_push($arr,$row);
			
			}
			//var_dump($arr);
			//4.关闭连接
			mysqli_close($connect);
		    return $arr;
		}
		catch(Exception  $e)
		{
			#echo $e;
		}
	}
	
}
	
	
