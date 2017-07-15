docker run  --privileged=true  --name my-python-script -v "$(pwd)"/run.sh:/run.sh -v "$(pwd)"/script/:/usr/src/myapp/script -p 9023:9023 my-python-app

