#!bin/sh

find ./ -name "*file*" -print | xargs -i sed -i 's/wfg/test1/' {} ;
find ./ -name "*file*" -print | xargs grep -Hn 'wfg'