FROM node:16

COPY ./app /app

WORKDIR /app

RUN npm install

RUN npm run build

ENTRYPOINT  [ "node", "server.cjs" ]