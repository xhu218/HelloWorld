#/bin/sh
mkdir /infinityfs1
mkdir /infinityfs1/hivefiles
mount -t cifs //172.16.168.202/hivefiles /infinityfs1/hivefiles -o username=root,pass=root

