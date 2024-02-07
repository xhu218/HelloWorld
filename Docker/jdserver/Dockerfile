FROM node:latest

# Create app directory
RUN mkdir -p /home/Service
RUN chmod 777 /home/Service
WORKDIR /home/Service

# Bundle app source
COPY . /home/Service

ADD ./run.sh /run.sh

#RUN yum install -y tar
#RUN apt-get update 

#RUN apt-get install tar

#RUN tar -xf node_modules.tar

#RUN npm install

EXPOSE 8888
#CMD [ "npm", "start" ]
CMD ["/bin/sh","-c","/run.sh -D"]
