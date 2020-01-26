<?php

include_once '../process/base.php';
include_once  "fileHelper.php";
include_once "messageHelper.php";
include_once "mysqlHelper.php";
include_once "translateHelper.php";
include_once "tokenHelper.php";
include_once "../baidu/tts.php";
include_once "materialHelper.php";


$token = new tokenHelper();
#echo $token->getToken();

$baidu = new baidu();
//$baidu->GetAudio("hello, this is felix","1.mp3");

$material = new materialHelper();
$res =  $material->mediaupload("data/6653950917659852800.mp3");
echo $res;

