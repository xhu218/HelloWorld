#!/bin/bash

ref=5
while true;
do

   tryTimes=0
   string=""
    for i in {1..3}; do

        string=`uptime | awk {'print $10 $11 $12'}`     #"hello,shell,haha"
        #string="hello,shell,split,test"  
        array=(${string//,/ })  
        sum=0
        for var in ${array[@]}
        do
            
            v=`echo $var| awk '{print int($0)}'`
            (( sum=sum+v ))
			
        done 
        
        echo "sum = $sum"
        #sum=$(($RANDOM%50+1))
        if [ $sum -gt $ref ]; then
            echo "$sum > $ref"
            ((tryTimes++))
        else
            echo "$sum < $ref"
            break
        fi
        
        
        sleep 1    
    done
    
    if [ "$tryTimes" = "3" ]; then
    
        echo "有问题了"
		python myemail.py `hostname` $string
    
    fi
    
    echo "------------------------------------------------------"
    sleep 3
    
done
