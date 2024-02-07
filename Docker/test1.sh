#!/bin/sh
tgz=`date +%Y%m%d`.tgz
mysql__dest_tar=/mnt/sda4/$tgz
cd /sobeyhive/data/
tar -zcvf $mysql__dest_tar mysql
/sobeyhive/app/qshell-linux-x64 fput xhu219 $tgz $mysql__dest_tar

ftp -i -n php.91sc.top <<EOF
		user qxu1194650105 Pass2word
		put $mysql__dest_tar  /htdocs/mysql/$tgz
EOF

