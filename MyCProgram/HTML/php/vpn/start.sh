echo start
docker stop my-vpn-script
docker rm my-vpn-script	
#m=`date -d "8 hours" +"%Y-%m-%d %H:%M:%S"`
m=`date +"%Y-%m-%d %H:%M:%S"`
p=`date +%N`
echo $m>log3.txt
curl http://91sc.top/vpn/banner.txt	>>	log3.txt
echo "server ip:vpn.91sc.top"	>>	log3.txt
echo "server port:1984		"	>>	log3.txt
echo "encrption:aes-256-cfb	"	>>	log3.txt
echo "password:$p			"	>>	log3.txt

curl http://91sc.top/upload_file.php -F "file=@log3.txt"
docker run -d --name my-vpn-script -p 1984:1984 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1984 -k $p -m aes-256-cfb