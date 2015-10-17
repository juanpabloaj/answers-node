FROM node:0.12

WORKDIR /tmp

RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && \
    dpkg -i erlang-solutions_1.0_all.deb && \
    apt-get update && apt-get install -y elixir

ADD . /app
WORKDIR /app

RUN npm install

CMD ["node", "server.js"]
