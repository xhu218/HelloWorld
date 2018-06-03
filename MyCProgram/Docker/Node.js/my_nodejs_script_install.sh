docker run  --privileged=true -d --name my-nodejs-script -v $(pwd)/script/:/home/Service/script -p 8888:8888 my-nodejs-app
