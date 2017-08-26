docker run -p 8080:80 -p 5043:5043  \
    --name my-elk-script \
    -v $(pwd)/config:/etc/logstash \
    -v $(pwd)/ssl:/etc/ssl \
    --volumes-from dbdata \
    willdurand/elk

