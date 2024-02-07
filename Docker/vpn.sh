#!/bin/sh
if [[ "$1"="init" ]]; then

	yum install docker
	service docker start
	systemctl enable docker

	docker stop my-vpn-script
	docker rm my-vpn-script
	
	#echo `date`
	m=`date +%T`
	#echo $m
	p=`date +%N`
   
	# echo `date` $p>>log.txt
	
	echo start
	echo `date` $p >>log1.txt
	curl http://91sc.top/upload_file.php -F "file=@log1.txt"
	docker run -d --name my-vpn-script -p 1984:1984 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1984 -k $p -m aes-256-cfb
	
	exit 1

else

	while true;
	
	do
		#echo `date`
		m=`date +%T`
		#echo $m
		p=`date +%N`
	   
		# echo `date` $p>>log.txt	   

		if  [ "$m"x = "09:00:00"x ]; then
			echo start
			echo `date` $p >>log1.txt
			curl http://91sc.top/upload_file.php -F "file=@log1.txt"
			docker run -d --name my-vpn-script -p 1984:1984 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1984 -k $p -m aes-256-cfb
		elif [ "$m"x = "22:00:00"x ]; then
			echo stop
			docker stop my-vpn-script
			docker rm my-vpn-script
		else 
			echo $m
		fi
		
		sleep 1
	done


fi




