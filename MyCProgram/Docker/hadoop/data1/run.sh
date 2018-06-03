echo $1

cd $HADOOP_PREFIX 
mkdir $1

cd $1

echo 'hello wfg' > file1
echo 'hello wfg' > file2
echo 'hello lxx' > file4
echo 'hello lxx' > file5


cd $HADOOP_PREFIX 
bin/hadoop dfs -mkdir /$1

cd $HADOOP_PREFIX 
bin/hdfs dfs -copyFromLocal $1/* /$1

cd $HADOOP_PREFIX 
bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.0.jar grep /$1 output-$1 'hello.*'

# check the output
cd $HADOOP_PREFIX
bin/hdfs dfs -cat output-$1/*
