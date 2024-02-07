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
//$photoFilename = '/var/www/html/examples/wall_paper.jpg';
$photoFilename = $file;
$captionText = 'this is photo';
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
    $ig->timeline->uploadPhoto($photoFilename, ['caption' => $captionText]);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
}
