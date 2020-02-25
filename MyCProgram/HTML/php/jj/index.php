<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="jquery-1.9.1.js"></script>
    <script>
    $(document).ready(function() {
		//alert('hello');
	})
    </script>
</head>
<body>
	
	<?php
	include_once "../mp/mysqlHelper.php";
	$sql = "SELECT * FROM V_JJ_SELECT;";
	$sqlHelper = new mysqlHelper();
	$data = $sqlHelper->ExcuteScaler($sql);
	
	if($data!=null && sizeof($data)>0)
	{
		for($index=0;$index<sizeof($data);$index++){
			echo "<image src=http://91sc.top/jj/pic-r.php?url=http://j4.dfcfw.com/charts/pic6/".$data[$index][0] .".png?t=" .date("Ymdhis") ." />";
			//echo "<image src=http://xhu218-s.91sc.top/".$data[$index][0] .".png?t=" .date("Ymdhis") ." />";
		}
		
	}
	?>
</body>
</html>
