while true; do

	a=`date +%H%m`
	b=1000
		echo $a
		echo $b
	if [ $a -eq $b ] 
	then
		echo 'the same'
	else
		echo 'NOT the same'

	fi 

    sleep 1
done
echo "finished"

