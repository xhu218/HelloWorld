                                           
<?php
$access_id = '1Q6kOA4w2vfsJdEYm';
$access_key = 'JfgOIdkRKiAkb0VEhWWUdtgsNr6Bfl';
$url='http://xhu218.oss-cn-beijing.aliyuncs.com';//更改成你自己的地址
$policy = '{"expiration": "2121-01-01T12:00:00.000Z","conditions":[{"bucket": "xhu218" },["content-length-range", 0, 104857600]]}';
$policy = base64_encode($policy);
$signature = base64_encode(hash_hmac('sha1', $policy, $access_key, true));//生成认证签名
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
    <div>文件上传</div>
    <form action="<?php echo $url;?>" method="post" enctype="multipart/form-data">
      <label for="file">选择文件:</label>
      <input type="hidden" name="OSSAccessKeyId" id="OSSAccessKeyId" value="<?php echo $access_id; ?>" />
      <input type="hidden" name="policy" id="policy" value='<?php echo $policy; ?>' />
      <input type="hidden" name="signature" id="signature" value="<?php echo $signature; ?>" />
      <input type="hidden" name="key" id="key" value="${filename}" />
      <input type="file" name="file" id="file" />
      <br />
      <input type="submit" name="submit" value="确定" />
    </form>
  </body>
</html>                                  