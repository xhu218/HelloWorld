<?php


	function insertjd($url,$time,$email)
	{
		try{
			
			//1.建立连接
			$connect=mysqli_connect('mysql.91sc.top','qdm170526179','Pass2word','qdm170526179_db','3306');
			if(!$connect)
			{
				#echo "连接MYSQL错误" ."</br>";
			}
			else
			{
			  #echo "连接数据库成功" ."</br>";
			}
			
			//2.定义sql语句
			$sql="INSERT INTO JDINFO(URL,TIME,EMAIL) VALUES('" .$url ."','" .$time ."','".$email ."')";
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

	function insert($host,$time,$tool)
	{
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
			$sql="INSERT INTO USEINFO(host,time,tool) VALUES('" .$host ."','" .$time ."','".$tool ."')";
			mysqli_query($connect,'set names utf8');
			//3.发送SQL语句
			$result=mysqli_query($connect,$sql);
		
			//4.关闭连接
			mysqli_close($connect);
		}
		catch(Exception  $e)
		{
			#echo $e;
		}
	}

	function select($query)
	{
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
			//var_dump($row);
			//echo $row[0] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$row[1] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$row[2] ."&nbsp;&nbsp;&nbsp;&nbsp;" .$row[3] ;
			//echo "</br>";
				//array_push(要存入的数组，要存的值)
				array_push($arr,$row);
			
			}
			//var_dump($arr);
			//4.关闭连接
			mysqli_close($connect);
		    return $arr;
		}
		catch(Exception  $e)
		{
			echo $e;
		}
	}
 ?>