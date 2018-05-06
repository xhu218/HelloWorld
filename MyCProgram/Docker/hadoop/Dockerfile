FROM 789fa0a3b911

RUN sed 's/1/0/' /etc/yum/pluginconf.d/protectbase.conf
RUN rpm -ivh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
RUN yum install -y nodejs

CMD ['/etc/bootstrap.sh','-d']
