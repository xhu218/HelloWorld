FROM gcc:latest

RUN mkdir /usr/src/myapp

COPY . /usr/src/myapp

RUN chmod 777 /usr/src/myapp

WORKDIR /usr/src/myapp

ADD ./run.sh /run.sh

##RUN touch sshd

##RUN chmod 777 sshd

#RUN gcc -o myapp main.c

CMD ["/bin/sh","-c", "/run.sh -D"]
