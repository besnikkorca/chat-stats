FROM node:16

RUN apt-get update && apt-get install -y \
    sudo && apt-get install -y \
    git \
    nginx \
    postgresql-client

RUN mkdir /scripts
COPY docker/Docker.server.node/entrypoint.sh /scripts

RUN mkdir /code

COPY /server /code/server

ADD tsconfig.json package.json .env.example.docker /code/

WORKDIR /code
RUN yarn install

WORKDIR /code/server
RUN yarn install

EXPOSE 80

ENTRYPOINT ["/bin/bash", "/scripts/entrypoint.sh"]

CMD ["development"]
