#!/bin/sh

cd script

javac com/test1.java

jar cvfm ../lib/com.jar MANIFEST.MF -C . .

#step 2
#cd to the myapp dir
#生成test.class
cd ..
javac -cp lib/com.jar script/test.java

#打包

jar cvfm felix.jar MANIFEST.MF  -C . .       
