FROM node:18-alpine

WORKDIR /var/www/html

RUN apk update && \
    npm install -g npm

EXPOSE 3000
ENV HOST 0.0.0.0