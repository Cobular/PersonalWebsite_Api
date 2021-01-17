FROM node:14.15.4-slim

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./
RUN npm i && npm install pm2 -g

COPY ./src .

RUN npm run build

EXPOSE 3000

CMD [ "pm2-runtime", "./dist/app.js" ]