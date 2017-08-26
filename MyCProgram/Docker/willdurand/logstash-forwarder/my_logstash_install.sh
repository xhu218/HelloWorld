docker run \
    --name my-logstash-script \
    --volume $(pwd)/ssl/files:/etc/ssl \
    --volume $(pwd)/config/file:/etc/logstash-forwarder \
    --volume $(pwd)/var/log/nginx:/var/log/nginx \
    --volume $(pwd)/var/log/hipache:/var/log/hipache \
    --volume /etc/hosts:/etc/hosts:ro \
    willdurand/logstash-forwarder
