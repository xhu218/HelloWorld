docker run  --privileged -d  --name my-haproxycentos-script \
-v "$(pwd)"/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg  \
-v "$(pwd)"/certs:/etc/haproxy/certs \
-v "$(pwd)"/run.sh:/run.sh \
-v $(pwd)/var/log/haproxy/:/var/log/haproxy/ \
-v $(pwd)/rsyslog.conf:/etc/rsyslog.conf \
-v $(pwd)/rsyslog:/etc/sysconfig/rsyslog \
-P my-haproxycentos-app

