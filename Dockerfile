FROM dockerfile/nodejs:latest

ADD . /app
WORKDIR /app

RUN npm install

CMD ["node", "server.js"]
