FROM node:latest as frontend

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build


FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=frontend /usr/src/app/build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]