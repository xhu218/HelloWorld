#!/bin/sh
#echo $1


#if [ "$1" = "" ]; then
#    echo "parameter is null"
#    exit
#fi

#echo $1

hostname=`hostname`


if [[ -f "/sobeyhive/init" ]]; then

    echo "already inited"

else

    service docker start

    
    #1)创建文件夹
    echo "start create folder"
    mkdir /infinityfs1
    mkdir /infinityfs1/hivefiles
    mkdir /infinityfs1/macfiles


    #mount -t cifs //172.16.168.202/hivefiles /infinityfs1/hivefiles -o username=sobeyhive,pass=sobeyhive


    #2)创建环境变量

    rm /etc/profile.d/1sobeyhive.sh

    echo "start export parameter"
    echo 'export DOCKER_NETWORK_HOSTS="--dns 172.16.168.205 --add-host=hivenode01:172.16.168.201 --add-host=hivenode02:172.16.168.202 --add-host=hivenode03:172.16.168.203"' >>/etc/profile.d/1sobeyhive.sh
    echo "export LOCAL_HOST=$hostname">>/etc/profile.d/1sobeyhive.sh
    echo 'export APP_BASE=/sobeyhive/app'>>/etc/profile.d/1sobeyhive.sh
    echo 'export DOCKER_OTHER_PARAMS="-v /sobeyhive/app/ipconf.xml:/ipconf.xml:ro -v /sobeyhive/app/publicsetting.xml:/publicsetting.xml:ro -v /etc/resolv_hive.conf:/resolv.conf -v /etc/localtime:/etc/localtime:ro"'>>/etc/profile.d/1sobeyhive.sh
    echo 'export APP_HOME=/sobeyhive/app'>>/etc/profile.d/1sobeyhive.sh
    export 'NEBULA_VIP=172.16.168.205'>>/etc/profile.d/1sobeyhive.sh

    source     /etc/profile.d/1sobeyhive.sh





    #3)替换docker name
    echo "start replace docker name"
    cd /sobeyhive/app/
    tar -zxf install.tar
    cd /sobeyhive/app/install
    find ./ -name "*.sh" -print | xargs -i sed -i "s/WIOIVWEIOCWSE/$hostname/" {} ;
    find ./ -name "*.sh" -print | xargs -i sed -i "s/-WIOIVWEIOCWSE/-$hostname/" {} ;
    find ./ -name "*.sh" -print | xargs grep -Hn WIOIVWEIOCWSE




    #4)挂盘
    echo "start mount drive"
    
    #c=`cat /etc/fstab | grep -Hn "^#//172.16.168.202" |wc | awk '{print $1}'`
    
    if [[ -n `cat /etc/fstab | grep -Hn "^#//172.16.168.202"`  ]]; then
        echo "already mounted"
    else
        echo -e  "username=sobeyhive\npassword=sobeyhive" >/usr/local/etc/whisper.credentials
        echo "//172.16.168.202/hivefiles /infinityfs1/hivefiles cifs credentials=/usr/local/etc/whisper.credentials" >> /etc/fstab
        echo "//172.16.168.202/macfiles /infinityfs1/macfiles cifs credentials=/usr/local/etc/whisper.credentials" >> /etc/fstab
        
        mount -a    

    fi




    #5)加载image
    echo "start load images"
    cd /sobeyhive/app/images
    ./loadimg.sh
    
    curl http://91sc.top/sobeyhive/otherimages.sh | bash


    #6)安装所有容器
    echo "start install docker"
    cd /sobeyhive/app/install
    find ./ -name "*.sh" -print | bash


    #sed -i 's?/sobeyhive/start.sh??' /etc/rc.d/rc.local
    

    touch /sobeyhive/init
    echo "finished..."




fi






