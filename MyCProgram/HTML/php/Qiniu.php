<?php

// Fill These In!


define('S3_BUCKET', 'xhu218');

define('S3_KEY',    '5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P');
define('S3_SECRET', 'c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7');


//echo getdate()[0];
// Stop Here

$algorithm = "AWS4-HMAC-SHA1";

$policy = [
   'scope'=>S3_BUCKET,
   'deadline'=>getdate()[0]+3600,
   'insertOnly'=>1,
   'endUser'=>'wfg',
   //'returnUrl'=>'http://www.baidu.com',
   //'returnBody'=>,
   //'callbackUrl'=>,
   //'callbackHost'=>,
   //'callbackBody'=>,
   //'callbackBodyType'=>,
   'callbackFetchKey'=>0,
   'persistentOps'=>'avthumb/flv|saveas/eGh1MjE4OmEuZmx2;vframe/png/offset/1/w/200/h/100|saveas/eGh1MjE4OndmZy5wbmc=',
   'persistentPipeline'=>'sobeymps',
   'persistentNotifyUrl'=>'http://123.57.66.247:8080/yoga',
   //'saveKey'=>'wfg-'.
   'detectMime'=>1
   
];

//echo json_encode($policy);
$base64Policy = base64_encode(json_encode($policy));
//$base64Policy = "eyJzY29wZSI6IiIsImRlYWRsaW5lIjoxNDUwMDg4Mzg1fQ==";

// Signing Keys
$signature = hash_hmac('sha1', $base64Policy, S3_SECRET, true);
$signature = base64_encode($signature);
$signature = str_replace("+","-",$signature);
$signature = str_replace("/","_",$signature);
$signature = S3_KEY.":".$signature.":".$base64Policy;


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

            input {width:1200px;}
        </style>
    </head>
    <body>

		
		
		<form method="post" action="http://upload.qiniu.com/" enctype="multipart/form-data">
				<input name="key"  value="orignal.mp4">
                <br />
				<input name="token"  value="<?php echo $signature; ?>">
                <br />
				<input name="file" type="file" />
                <br />
				<button type="submit" value="提交" style="width:100px;height:20px" >提交</button>
		</form>

        <script src="//code.jquery.com/jquery-2.1.4.min.js?version=20150824"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js?version=20150824"></script>
        <script src="fileupload/jquery.fileupload.js?version=20150824"></script>
        <script>
            $(document).ready(function () {
                $('.direct-upload').each(function () {
                    var form = $(this);
                    form.fileupload({
                        url: form.attr('action'),
                        type: 'POST',
                        datatype: 'xml',
                        add: function (event, data) {

                            // Give the file being uploaded it's current content-type
                            // It doesn't retain it otherwise.
                            form.find('input[name="Content-Type"]').val( data.originalFiles[0].type );

                            // Message on unLoad.
                            // Shows 'Are you sure you want to leave message', just to confirm.
                            window.onbeforeunload = function () {
                                return 'You have unsaved changes.';
                            };

                            // Actually submit to form, sending the data.
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