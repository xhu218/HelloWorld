docker run  --privileged=true  --name my-php-script -v "$(pwd)"/run.sh:/run.sh -v "$(pwd)"/script/:/usr/src/myapp/script  my-php-app

