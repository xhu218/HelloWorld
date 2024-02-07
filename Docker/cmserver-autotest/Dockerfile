FROM nodejs:6.10.0

# Create app directory
RUN mkdir -p /home/Service
RUN chmod 777 /home/Service
WORKDIR /home/Service

# Bundle app source
# COPY . /home/Service

ADD ./run.sh /run.sh

# RUN yum install -y wget
# RUN cd /home/Service
# RUN curl http://172.16.148.14:82/node_modules.tar -o node_modules.tar


#设置国内源

# RUN cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
# RUN cd /etc/yum.repos.d/
# RUN wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
# RUN yum makecache

# RUN yum install -y tar

#RUN apt-get update 
#RUN apt-get install tar

# RUN tar -zxf /home/Service/node_modules.tar

#RUN npm install

EXPOSE 8888
#CMD [ "npm", "start" ]
CMD ["/bin/sh","-c","/run.sh -D"]
