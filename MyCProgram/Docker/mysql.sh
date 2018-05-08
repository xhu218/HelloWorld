#http://galeracluster.com/2015/05/getting-started-galera-with-docker-part-2/

yum install -y docker
service docker start

if [ `hostname` ==  `echo $MysqlMain` ]
then
        echo 'the mysql main is on the server'
		docker run -d -p 3306:3306 -p 4567:4567 -p 4444:4444 -p 4568:4568 --name mysql-hivenode01 erkules/galera --wsrep-cluster-address=gcomm:// --wsrep-node-address=hivenode01   
else
		if [ `hostname` ==  'hivenode02' ]
		then
			echo 'hivenode02'
			docker run -d -p 3306:3306 -p 4567:4567 -p 4444:4444 -p 4568:4568 --name mysql-hivenode02 erkules/galera --wsrep-cluster-address=gcomm://hivenode01 --wsrep-node-address=hivenode02
		else
			echo 'hivenode03'
			docker run -d -p 3306:3306 -p 4567:4567 -p 4444:4444 -p 4568:4568 --name mysql-hivenode03 erkules/galera --wsrep-cluster-address=gcomm://hivenode01 --wsrep-node-address=hivenode03
		fi
		
fi






