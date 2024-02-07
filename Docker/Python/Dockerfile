FROM docker.io/10sr/centos6.6-python2.7:latest
COPY ./ /usr/src/myapp
ADD ./run.sh /run.sh
WORKDIR /usr/src/myapp
EXPOSE 9023
CMD ["/bin/sh","-c","/run.sh -D"]
