<?php
	
	function decode($cryptkey, $iv, $secretdata){
		//return openssl_decrypt($secretdata,'aes-256-cbc',$cryptkey,false,$iv);
		
		$d =  openssl_decrypt($secretdata,'aes-256-cbc',$cryptkey,false,$iv);
		$d = str_replace(array('_','-'),array('/','+'),$d);
		return $d;
	}
	function encode($cryptkey, $iv, $secretdata){
		return openssl_encrypt($secretdata,'aes-256-cbc',$cryptkey,false,$iv);
	}
	$cryptkey = hash('sha256','__tazai_wolf__key',true);
	$iv = '1234567890000000';
	$buf = "tGZ4/muzn8cVFvB2RGvg/PvkV4XVOFr6VIYlHDBa9jTPKjdPMLvNx/v3RjWgvubCQqdv8war3nkUaS1vJ521wpiSkHaQWAqgD9x5MgqNYS4=";
	 
	$enc = encode($cryptkey,$iv,$buf);
	echo "Encoded length: ",$enc,"\n";
	$enc = "tGZ4/muzn8cVFvB2RGvg/PvkV4XVOFr6VIYlHDBa9jTPKjdPMLvNx/v3RjWgvubCQqdv8war3nkUaS1vJ521wpiSkHaQWAqgD9x5MgqNYS4=";
	
	$dec = decode($cryptkey, $iv, $enc);
	 
	echo "Encoded length: ",$enc,"\n";
	echo "Decoded all: ",$dec,"\n";