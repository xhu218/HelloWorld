<?php

include_once  "../mp/fileHelper.php";
include '../process/base.php';


$code = getUrlParam("code");


$file = new fileHelper();

$file->writefile1("data/weibo_auth.dat",$code);
echo $code;