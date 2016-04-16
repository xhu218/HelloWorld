<?php

// Fill These In!


define('S3_BUCKET', 'sobey1');//
define('S3_OBJECT','test-wangkai.log');
define('S3_KEY',    '61140DEQBD8L2QSRATPS');//
define('S3_SECRET', '1oZedqSsM2DLjer2VvZ74ACpn998TamNbz4LEURN');//1oZedqSsM2DLjer2VvZ74ACpn998TamNbz4LEURN
define('S3_REGION', 'cn-north-1');        // S3 region name: http://amzn.to/1FtPG6r  //
define('S3_ACL',    'private'); // File permissions: http://amzn.to/18s9Gv7

// Stop Here

$algorithm = "AWS4-HMAC-SHA256";
$service = "s3";
$date = gmdate('Ymd\THis\Z');
$shortDate = gmdate('Ymd');
$requestType = "aws4_request";
$expires = '86400'; // 24 Hours
$successStatus = '201';


$scope=array( 
	S3_KEY,
    $shortDate,
    S3_REGION,
    $service,
    $requestType
);
$credentials = implode('/', $scope);
$policy = array(
	'expiration' => gmdate('Y-m-d\TG:i:s\Z', strtotime('+6 hours')),
	'conditions'=>array(
		array('bucket' => S3_BUCKET),
		array('acl' => S3_ACL),
		array('starts-with', '$key', S3_OBJECT),
		array('starts-with', '$Content-Type', ''),
		array('starts-with', '$success_action_status', $successStatus),

		array('expires' => $expires)
	)
);
//echo json_encode($policy);


$base64Policy = base64_encode(stripslashes(json_encode($policy)));
$signature = base64_encode(hash_hmac('sha1',$base64Policy,S3_SECRET, true));


//echo "signature=".$signature."</BR>";
?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Direct Upload Example</title>
        <style>
            .progress {
                position: relative;
                width: 100%; height: 15px;
                background: #C7DA9F;
                border-radius: 10px;
                overflow: hidden;
            }
            .bar {
                position: absolute;
                top: 0; left: 0;
                width: 0; height: 15px;
                background: #85C220;
            }
            .bar.red { background: tomato; }
        </style>
		<script src="jquery-2.2.0.min.js"></script>
        <!--<script src="fileupload/jquery.fileupload.js?version=20150824"></script>-->
        <script type="text/javascript">

            function doUpload() {

                 var formData = new FormData($(".direct-upload")[0]);
				         alert(formData);
         /*
                 $.ajax({
                      url: 'https://obs.myhwclouds.com/sobey1',
                      type: 'POST',
					  dataType: "text",
                      data: formData,
                      async: true,
                      cache: false,
                      contentType: false,
                      processData: false,
                      success: function (returndata) {
						alert('success');
                          console.log(returndata);
                      },
                      error: function (returndata,status) {
					  alert('error');
						console.log(returndata);
                      }
                      */
                    var url = "https://obs.myhwclouds.com/sobey1";
                    var oReq = new XMLHttpRequest();
                    oReq.open("POST", url);
                    oReq.send(formData);
                // });
            }
        </script>
    </head>
    <body>

        <!-- Direct Upload to S3 -->
        <!-- URL prefix (//) means either HTTP or HTTPS (depending on which is being currently used) -->
        <!-- . "-" . S3_REGION-->
        <!--.amazonaws.com------.cn-north-1.amazonaws.com.cn-->
        <!--<form action="//<?php echo S3_BUCKET . "." . $service; ?>.amazonaws.com" https://obs.myhwclouds.com/sobey1-->
		<form action="https://10.174.49.16/obsobject/obs-4135" 
		
              method="POST"
              enctype="multipart/form-data"
              class="direct-upload">

            <!-- Note: Order of these is Important -->
            <!-- Key and Content-Type can be filled in with JS -->
            <input type="hidden" name="key" value="<?php echo S3_OBJECT; ?>">
            <input type="hidden" name="content-type" value="">
            <input type="hidden" name="acl" value="<?php echo S3_ACL; ?>">
            <input type="hidden" name="success_action_status" value="<?php echo $successStatus; ?>">
            <input type="hidden" name="policy" value="<?php echo $base64Policy; ?>">
			<input type="hidden" name="AWSAccessKeyId" value="<?php echo S3_KEY; ?>">
            <!--input type="hidden" name="x-amz-algorithm" value="//<?php echo $algorithm; ?>"-->
            <!--input type="text" name="x-amz-credential" value="//<?php echo $credentials; ?>"-->
            <!--input type="hidden" name="x-amz-date" value="//<?php echo $date; ?>"-->
            <input type="hidden" name="expires" value="<?php echo $expires; ?>">
            <input type="hidden" name="signature" value="<?php echo $signature; ?>">

            <input type="file" name="file">
            <!-- Progress Bar to show upload completion percentage -->
            <div class="progress"><div class="bar"></div></div>
			<input type="submit" value="Upload"/>
            <input type="button" value="上传" onclick="doUpload()" />
        </form>

    </body>
</html>