<?php

// Fill These In!


define('S3_BUCKET', 'sobey1');
define('S3_OBJECT','test-txt1.log');
define('S3_KEY',    '61140DEQBD8L2QSRATPS');
define('S3_SECRET', '1oZedqSsM2DLjer2VvZ74ACpn998TamNbz4LEURN');
define('S3_REGION', 'cn-north-1');        // S3 region name: http://amzn.to/1FtPG6r
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
		//array('success_action_status' => $successStatus),
		//array('x-amz-credential' => $credentials),
		//array('x-amz-algorithm' => $algorithm),
		//array('x-amz-date' => $date),
		array('expires' => $expires)
	)
);
echo json_encode($policy);
 /*
$scope = [
    S3_KEY,
    $shortDate,
    S3_REGION,
    $service,
    $requestType
];
$credentials = implode('/', $scope);

$policy = [
    'expiration' => gmdate('Y-m-d\TG:i:s\Z', strtotime('+6 hours')),
    'conditions' => [
        ['bucket' => S3_BUCKET],
        ['acl' => S3_ACL],
        ['starts-with', '$key', ''],
        ['starts-with', '$Content-Type', ''],
        ['success_action_status' => $successStatus],
        ['x-amz-credential' => $credentials],
        ['x-amz-algorithm' => $algorithm],
        ['x-amz-date' => $date],
        ['x-amz-expires' => $expires],
    ]
];
*/

$base64Policy = base64_encode(stripslashes(json_encode($policy)));
$signature = base64_encode(hash_hmac('sha1',$base64Policy,S3_SECRET, true));

/*
echo "policy</BR>".json_encode($policy)."</br></BR>";
$base64Policy = base64_encode(json_encode($policy));
echo "base64Policy</BR>".$base64Policy."</BR>";
// Signing Keys
echo "<hr>";
$dateKey = hash_hmac('sha256', $shortDate, 'AWS4' . S3_SECRET, true);
echo "datekey=".hash_hmac('sha256', $shortDate, 'AWS4' . S3_SECRET)."</br>";

$dateRegionKey = hash_hmac('sha256', S3_REGION, $dateKey, true);
echo "dateRegionKey=". hash_hmac('sha256', S3_REGION, $dateKey)."</br>";

$dateRegionServiceKey = hash_hmac('sha256', $service, $dateRegionKey, true);
echo "dateRegionServiceKey=".hash_hmac('sha256', $service, $dateRegionKey)."</br>";

$signingKey = hash_hmac('sha256', $requestType, $dateRegionServiceKey, true);
echo "signingKey=".hash_hmac('sha256', $requestType, $dateRegionServiceKey)."</br>";

// Signature
//$base64Policy = "eyAJeyAJCSJleHBpcmF0aW9uIjogIjIwMTUtMDgtMTFUMTI6MDk6MjBaIiwgCQkiY29uZGl0aW9ucyI6IFt7IAkJCSJidWNrZXQiOiAieGh1MjE4IiAJCX0sIAkJeyAJCQkiYWNsIjogInByaXZhdGUiIAkJfSwgCQlbInN0YXJ0cy13aXRoIiwgCQkiJGtleSIsIAkJIiJdLCAJCVsic3RhcnRzLXdpdGgiLCAJCSIkQ29udGVudC1UeXBlIiwgCQkiIl0sIAkJeyAJCQkic3VjY2Vzc19hY3Rpb25fc3RhdHVzIjogIjIwMSIgCQl9LCAJCXsgCQkJIngtYW16LWNyZWRlbnRpYWwiOiAiQUtJQUpBT1dNSTY1R1hCSUo0WlEvMjAxNTA4MTEvYXAtbm9ydGhlYXN0LTEvczMvYXdzNF9yZXF1ZXN0IiAJCX0sIAkJeyAJCQkieC1hbXotYWxnb3JpdGhtIjogIkFXUzQtSE1BQy1TSEEyNTYiIAkJfSwgCQl7IAkJCSJ4LWFtei1kYXRlIjogIjIwMTUwODExVDExMDkyMFoiIAkJfSwgCQl7IAkJCSJ4LWFtei1leHBpcmVzIjogIjg2NDAwIiAJCX1dIAl9IH0=";
$signature = hash_hmac('sha256', $base64Policy, $signingKey);
*/

echo "signature=".$signature."</BR>";
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
		<script src="site/jquery-1.11.3.js"></script>
        <!--<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js?version=20150824"></script>-->
        <script src="fileupload/jquery.fileupload.js?version=20150824"></script>
        <script type="text/javascript">

            function doUpload() {
                 var formData = new FormData($("#uploadForm")[0]);
                 $.ajax({
                      url: 'https://obs.myhwclouds.com/sobey1' ,
                      type: 'POST',
                      data: formData,
                      async: false,
                      cache: false,
                      contentType: false,
                      processData: false,
                      success: function (returndata) {
                          alert(returndata);
                      },
                      error: function (returndata) {
                          alert(returndata);
                      }
                 });
            }
        </script>
    </head>
    <body>

        <!-- Direct Upload to S3 -->
        <!-- URL prefix (//) means either HTTP or HTTPS (depending on which is being currently used) -->
        <!-- . "-" . S3_REGION-->
        <!--.amazonaws.com------.cn-north-1.amazonaws.com.cn-->
        <!--<form action="//<?php echo S3_BUCKET . "." . $service; ?>.amazonaws.com" -->
		<form action="https://obs.myhwclouds.com/sobey1" 
		
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

        <!-- Used to Track Upload within our App -->
        <form action="server.php" method="POST">
            <input type="hidden" name="upload_original_name" id="upload_original_name">
            <label for="upload_custom_name">Name:</label><br />
            <input type="text" name="upload_custom_name" id="upload_custom_name"><br />
            <input type="submit" value="Save"/>
        </form>
		
  
		

        <script>
            $(document).ready(function () {
              $('.direct-upload').each(function () {
                    var form = $(this);
                    form.fileupload({
                        url: form.attr('action'),
                        type: 'POST',
                        datatype: 'xml',
                        //add: function (event, data) {

                            // Give the file being uploaded it's current content-type
                            // It doesn't retain it otherwise.
							console.log(form.find('input[name="Content-Type"]').val( data.originalFiles[0].type ));
                            form.find('input[name="Content-Type"]').val( data.originalFiles[0].type );

                            // Message on unLoad.
                            // Shows 'Are you sure you want to leave message', just to confirm.
                            window.onbeforeunload = function () {
                                return 'You have unsaved changes.';
                            };

                            // Actually submit to form, sending the data.
							console.log(data);
                            data.submit();
                        },
                        progress: function (e, data) {
                            // This is what makes everything really cool, thanks to that callback
                            // you can now update the progress bar based on the upload progress.
                            var percent = Math.round((data.loaded / data.total) * 100);
                            $('.bar').css('width', percent + '%');
                        },
                        fail: function (e, data) {
                            // Remove the 'unsaved changes' message.
                            window.onbeforeunload = null;
                            $('.bar').css('width', '100%').addClass('red');
                        },
                        done: function (event, data) {
                            window.onbeforeunload = null;
                            // Fill the name field with the file's name.
                            $('#upload_original_name').val(data.originalFiles[0].name);
                            $('#upload_custom_name').val(data.originalFiles[0].name);
                        }
                    });
                });
            });
        </script>
    </body>
</html>