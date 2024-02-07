#!/bin/sh

count=1

arrayWen=( my-jjserver-script my-jdserver-script my-mysql-script )  

#while [ $count -le 10000 ]; do
while true; do

	sh ./clear_docker_logs.sh

	#每天十点钟停下jj	
	########################################################
	a=`date +%H%M`
	b=1100
	tgz=`date +%Y%m%d`.tgz
	mysql__dest_tar=/mnt/sda4/$tgz
	
	echo $a
	echo $b
	
	if [ $a -eq $b ] 
	then
		docker stop my-jjserver-script
        docker stop my-mysql-script
		cd /sobeyhive/data/
		tar -zcvf $mysql__dest_tar mysql
		#Qiniu

		#./qshell-linux-x64  account 5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7

		#echo '{"access_key":"5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P","secret_key":"1111111111111111111111111111111-9wjOZA"}' > /root/.qshell/account.json 

		/sobeyhive/app/qshell-linux-x64 fput xhu219 $tgz $mysql__dest_tar

		
		#Aliyun
		#./ossutil64 config
		#Please enter endpoint:oss-cn-beijing.aliyuncs.com
		#Please enter accessKeyID:Q6kOA4w2vfsJdEYm
		#Please enter accessKeySecret:1111111111111111111111111111111-9wjOZA

		#echo -e '[Credentials]\nlanguage=EN\nendpoint=oss-cn-beijing.aliyuncs.com\naccessKeyID=Q6kOA4w2vfsJdEYm\naccessKeySecret=1111111111111111111111111111111-9wjOZA' > /root/.ossutilconfig 



		/sobeyhive/app/ossutil64 cp /mnt/sda4/$tgz oss://xhu219/mysql/$tgz
		#Baidu

		ftp -i -n php.91sc.top <<EOF
		user qxu1194650105 Pass2word
		put $mysql__dest_tar  /htdocs/mysql/$tgz
EOF

	
	
	fi 

	#########################################################

	echo ${#arrayWen[@]}  

	for containerName in ${arrayWen[@]};  
	do  
		#echo $containerName  
		if [ -z "`docker ps | grep $containerName`" ]; then
			echo "docker start $containerName"
			docker start $containerName
		fi
	done  
    #echo $count
    #count=$((count + 1))
	docker ps | awk '{print $1;}'
    sleep 5
done
echo "finished"

