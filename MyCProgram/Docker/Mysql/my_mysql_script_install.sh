docker run -d --privileged=true \
-p 3306:3306 \
--name my-mysql-script \
-e MYSQL_USER="mysql" \
-e MYSQL_PASSWORD="mysql" \
-e MYSQL_DATABASE="mydatabase" \
-e MYSQL_ROOT_PASSWORD="root" \
-v "$(pwd)"/run:/usr/local/bin/run \
-v "$(pwd)"/log:/usr/lib/sbin/log \
-v /sobeyhive/data/mysql/db:/var/lib/mysql \
mysql
