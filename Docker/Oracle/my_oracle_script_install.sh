  docker run -d --name my-oracle-script  \
  -p 49160:22 \
  -p 49161:1521 \
  -v /etc/localtime:/etc/localtime:ro \
  -v "$(pwd)"/logs:/tmp/log/ \
   -e ORACLE_ALLOW_REMOTE=true \
    wnameless/oracle-xe-11g

