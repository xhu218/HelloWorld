echo hello

haproxy -p /run/haproxy.pid -f /usr/local/etc/haproxy/haproxy.cfg -Ds

/bin/sh  /usr/sbin/init -D

systemctl rsyslog restart

echo world
