
#!/bin/sh
while true;

do
    #echo `date`
    #m=`date -d "8 hours" +"%Y-%m-%d %H:%M:%S"`
	m=`date +"%Y-%m-%d %H:%M:%S"`
	
	#currenttime=`date -d "8 hours" +"%H:%M:%S"`
	currenttime=`date +"%H:%M:%S"`
	
    #echo $m
    p=`date +%N`
   
    # echo `date` $p>>log.txt      

    if  [ "$currenttime"x = "09:00:00"x ]; then
    
        echo start
		
		echo $m>log3.txt
		curl http://91sc.top/vpn/banner.txt	>>	log3.txt
		echo "server ip:vpn.91sc.top"	>>	log3.txt
		echo "server port:1984		"	>>	log3.txt
		echo "encrption:aes-256-cfb	"	>>	log3.txt
		echo "password:$p			"	>>	log3.txt
		

        curl http://91sc.top/upload_file.php -F "file=@log3.txt"
        docker run -d --name my-vpn-script -p 1984:1984 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1984 -k $p -m aes-256-cfb
        
    elif [ "$currenttime"x = "23:59:59"x ]; then
    
        echo stop
        docker stop my-vpn-script
        docker rm my-vpn-script
        
    else 
    
        echo $m
        
    fi
    
    sleep 1
done
