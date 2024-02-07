#apt-get update
#apt-get install net-tools
while true;
do
d=${HOSTNAME}`date +"%y%m%d%H"`
d1=${HOSTNAME}`date +"%y%m%d%H%M%S"`

netstat -na >> /opt/cmserver/Logs/netstat${d}.txt
#tar -zcf netstat${d1}.txt.tar netstat${d}.txt
#curl http://91sc.top/upload_file.php -F "file=@netstat${d1}.txt.tar"

sleep 30
done

