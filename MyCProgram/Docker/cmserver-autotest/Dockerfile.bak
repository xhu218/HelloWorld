FROM node:latest

# Create app directory
RUN mkdir -p /home/Service
RUN chmod 777 /home/Service
WORKDIR /home/Service

# Bundle app source
COPY . /home/Service

RUN npm install

EXPOSE 8888
CMD [ "npm", "start" ]