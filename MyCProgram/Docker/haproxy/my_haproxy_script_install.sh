docker run  --privileged=true -d  --name my-haproxy-script \
-v "$(pwd)"/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg  \
-v "$(pwd)"/certs:/etc/haproxy/certs \
-p 88:88  my-haproxy-app

