<?php 
function downfile($fileurl)
{
	 ob_start(); 
	 $filename=$fileurl;
	 $date=date("Ymd-H:i:m");
	 header( "Content-type:  application/octet-stream "); 
	 header( "Accept-Ranges:  bytes "); 
	 header( "Content-Disposition:  attachment;  filename= {$date}.json"); 
	 $size=readfile($filename); 
	  header( "Accept-Length: " .$size);
}
$url="http://xhu219.s3.91sc.top/data/67438964@qq.com.json";
//downfile($url);


/**
 * 保存文件到本地
 * @param 文件路径 $url
 * @param 保存本地路径 $savePath
 * @return string
 */
function downloadFile($url,$savePath='')
{
    $fileName = getUrlFileExt($url);

    $fileName=".json";

        $fileName = rand(0,1000).$fileName;
          echo $savePath.'/'.$fileName;
    $file = file_get_contents($url);
    file_put_contents($savePath.'./'.$fileName,$file);
        return $fileName;
}
 
/**
 * 获取文件扩展名
 * @param 网页URL $url
 * @return string
 */
function getUrlFileExt($url)
{
    $ary = parse_url($url);
    $file = basename($ary['path']);
    $ext = explode('.',$file);
    return $ext[1];
}


downloadFile($url);


?>