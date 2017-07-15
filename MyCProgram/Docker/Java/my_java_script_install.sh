docker run  --privileged=true  --name my-java-script -v "$(pwd)"/run.sh:/run.sh -v "$(pwd)"/script/:/usr/src/myapp/script  my-java-app

