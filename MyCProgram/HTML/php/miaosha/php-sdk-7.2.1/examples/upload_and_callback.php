<?php
require_once __DIR__ . '/../autoload.php';

use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

$accessKey = "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P";//getenv('QINIU_ACCESS_KEY');
$secretKey = "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7";//getenv('QINIU_SECRET_KEY');
$bucket = "xhu218";//getenv('QINIU_TEST_BUCKET');


echo "accessKey = " .$accessKey . "secretKey = " .$secretKey ."bucket = " .$bucket;

$auth = new Auth($accessKey, $secretKey);

// 上传文件到七牛后， 七牛将文件名和文件大小回调给业务服务器.
// 可参考文档: http://developer.qiniu.com/docs/v6/api/reference/security/put-policy.html
$policy = array(
    //'callbackUrl' => 'http://www.baidu.com',
    //'callbackBody' => 'filename=$(fname)&filesize=$(fsize)'
);
$uptoken = $auth->uploadToken($bucket, null, 3600, $policy);

//上传文件的本地路径
$filePath = './php-logo.png';

$uploadMgr = new UploadManager();

list($ret, $err) = $uploadMgr->putFile($uptoken, null, $filePath);
echo "\n====> putFile result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
