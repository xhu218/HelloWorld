FROM docker.io/centos 
#ENV DEBIAN_FRONTEND=noninteractive
RUN yum -y  install haproxy
RUN yum -y  install rsyslog
EXPOSE 88
ADD ./run.sh /run.sh
RUN chmod a+x /run.sh
RUN touch /run/haproxy.pid
CMD ["/bin/sh","-c","/run.sh -D"]
