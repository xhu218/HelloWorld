docker run -d --name  my-nginx-script -p 80:80 \
-v "$(pwd)"/conf.d:/etc/nginx/conf.d \
-v "$(pwd)"/certs:/etc/nginx/certs \
-v "$(pwd)"/log:/var/log/nginx \
-v "$(pwd)"/html:/var/www/html \
nginx
