FROM mono:latest
MAINTAINER Victor Vieux <wangfugui@sobey.com>

# Create app directory
RUN mkdir -p /home/Service
RUN chmod 777 /home/Service
WORKDIR /home/Service
RUN touch sshd
RUN chmod 777 sshd
COPY ./run.sh /run.sh
RUN ["/bin/sh","-c","chmod 777 /run.sh"]
CMD ["/bin/sh","-c","/run.sh \u0026\u0026 /home/Service/sshd -D"]
EXPOSE 80 9023

