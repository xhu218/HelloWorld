FROM java:latest
COPY ./ /usr/src/myapp
WORKDIR /usr/src/myapp
ADD ./run.sh /run.sh
EXPOSE 9023
CMD ["/bin/sh","-c","/run.sh -D"]

