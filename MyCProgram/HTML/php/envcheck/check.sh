
#!/bin/sh

if [[ ! -d "/envcheck" ]] ; then

    mkdir /envcheck	
    curl http://91sc.top/envcheck/myemail.py -o /envcheck/myemail.py
	yum install -y sendmail
	
fi


writeLog(){

    echo "`date +%T`"  $1 >> /envcheck/envcheck-`date +%Y-%m-%d`.log
    #echo "`date +%T`"  $1
}

clearLog(){

       m=`date +%k`
    if  [ "$m"x = "10"x ]; then
    
        day1=/envcheck/envcheck-`date +%Y-%m-%d --date='7 days ago'`.log
        day2=/envcheck/envcheck-`date +%Y-%m-%d --date='8 days ago'`.log
        day3=/envcheck/envcheck-`date +%Y-%m-%d --date='9 days ago'`.log
        day4=/envcheck/envcheck-`date +%Y-%m-%d --date='10 days ago'`.log
        day5=/envcheck/envcheck-`date +%Y-%m-%d --date='11 days ago'`.log
        day6=/envcheck/envcheck-`date +%Y-%m-%d --date='12 days ago'`.log
        day7=/envcheck/envcheck-`date +%Y-%m-%d --date='13 days ago'`.log
        echo  $day1 $day2 $day3 $day4 $day5 $day6 $day7
        rm $day1 $day2 $day3 $day4 $day5 $day6 $day7
    
    fi
}


check(){

	ref=10
	ref=`curl http://91sc.top/envcheck/ref`

	  
	   
   clearLog
   
   
   tryTimes=0
   string=""
   logString="`date +%T`"
	for i in {1..3}; do

		string=`uptime | awk {'print $10 $11 $12'}`     #"hello,shell,haha"
		#string="hello,shell,split,test"  
		array=(${string//,/ })  
		sum=0
		for var in ${array[@]}
		do
			
			v=`echo $var| awk '{print int($0)}'`
			logString="$logString                         $v"
			(( sum=sum+v ))
			
		done 
		
		writeLog "sum = $sum"
		#sum=$(($RANDOM%50+1))
		if [ $sum -gt $ref ]; then
			writeLog "$sum > $ref"
			((tryTimes++))
		else
			writeLog "$sum < $ref"
			break
		fi
		
		sleep 10
	done
	
	if [ "$tryTimes" = "3" ]; then
	
		writeLog "有问题了"
		echo $logString >>/envcheck/log.txt
		python /envcheck/myemail.py `date +%T``hostname` "/envcheck/log.txt"
		
	
	fi
	
	writeLog "------------------------------------------------------"


}

check

