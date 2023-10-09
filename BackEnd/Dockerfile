FROM node:latest

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 4000
RUN npm install -g nodemon
CMD [ "npm", "run", "dev" ]