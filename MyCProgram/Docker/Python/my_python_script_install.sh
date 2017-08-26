docker run -d  --privileged=true  --name my-python-script -v "$(pwd)"/run.sh:/run.sh -v "$(pwd)"/script/:/usr/src/myapp/script -P  my-python-app

