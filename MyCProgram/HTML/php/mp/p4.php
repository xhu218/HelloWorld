<?php

$ch = curl_init();
 $post_data = array(
                'a'=>'Post',
                'media' => '@1.mp3'
            );
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_POST, true);  
curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
curl_setopt($ch, CURLOPT_POSTFIELDS,$post_data);
curl_setopt($ch, CURLOPT_URL, 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=18_IFaH1W5nmWLP5K86e041IqT7ETEw1bNnUAapONzDwwL83HiZmMKU-8IPrPZAB5r3X0493umXuZ15MiuCuGK9_sPQvnp3zLq0wAUZzwuVoMT7fhMA2jKoNYvyLUpUoldd4YLrJr0cz3FRQnOSHTKhAGACOF&type=voice');
$info= curl_exec($ch);
curl_close($ch);
   
//print_r($info);
