docker run  --privileged=true  \
--name my-java-script \
-v "$(pwd)"/run.sh:/run.sh \
-v "$(pwd)"/:/usr/src/myapp  \
my-java-app

