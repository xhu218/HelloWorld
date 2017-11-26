<?php
require_once __DIR__ . 'php-sdk-7.2.1/autoload.php';

// 引入鉴权类
use Qiniu\Auth;

// 引入上传类
use Qiniu\Storage\UploadManager;

define('S3_BUCKET', 'xhu218');

define('S3_KEY',    '5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P');
define('S3_SECRET', 'c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7');

// 需要填写你的 Access Key 和 Secret Key
$accessKey = "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P";//getenv('QINIU_ACCESS_KEY');
$secretKey = "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7";//getenv('QINIU_SECRET_KEY');
$bucket = "xhu219";//getenv('QINIU_TEST_BUCKET');

// 构建鉴权对象
$auth = new Auth($accessKey, $secretKey);

// 上传到七牛后保存的文件名
$key = 'my-php-logo.png';

// 生成上传 Token
$token = $auth->uploadToken($bucket,$key);

// 要上传文件的本地路径
$filePath = './php-logo.png';



// 初始化 UploadManager 对象并进行文件的上传。
$uploadMgr = new UploadManager();

// 调用 UploadManager 的 putFile 方法进行文件的上传。
list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);
echo "\n====> putFile result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
