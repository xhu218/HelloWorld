<?php


$test = parse_url($url);
echo 'start...';
echo $_GET['name'];
$file = $_GET['name'];
echo '------------------------------------------------------';
echo '<hr>';

set_time_limit(0);
date_default_timezone_set('UTC');

require __DIR__.'/../vendor/autoload.php';

/////// CONFIG ///////
$username = 'lary_mao';
$password = '19950730yu';
$debug = true;
$truncatedDebug = false;
//////////////////////

/////// MEDIA ////////
//$videoFilename = '/var/www/html/examples/1234.mp4';
$videoFilename = $file;
$captionText = '';
//////////////////////

$ig = new \InstagramAPI\Instagram($debug, $truncatedDebug);

try {
    $ig->setUser($username, $password);
    $ig->login();
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
    exit(0);
}

try {
    // Note that all video upload functions perform some automatic chunk upload
    // retries, in case of failing to upload all video chunks to Instagram's
    // server! Uploads therefore take longer when their server is overloaded.
    $ig->timeline->uploadVideo($videoFilename, ['caption' => $captionText]);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
}
