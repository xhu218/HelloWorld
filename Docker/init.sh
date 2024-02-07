export MysqlMain=hivenode01
export RedisMain=hivenode01

export VIP=172.16.134.205
#export VIP=192.168.1.200


export hivenode01=172.16.134.31
export hivenode02=172.16.134.8
export hivenode03=172.16.134.6


#export hivenode01=192.168.1.102
#export hivenode02=192.168.1.101
#export hivenode03=192.168.1.103

export otherparameters=" --add-host=hivenode01:$hivenode01 --add-host=hivenode02:$hivenode02 --add-host=hivenode03:$hivenode03 "
