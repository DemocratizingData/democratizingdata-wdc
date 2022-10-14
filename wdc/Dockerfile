FROM node:16.15-slim

WORKDIR /www
COPY /src/package.json /src/package-lock.json /www/
RUN npm ci
COPY /src /www
ARG APIURL
ARG NODE_ENV=production
ENV APIURL=${APIURL}
ENV NODE_ENV=${NODE_ENV}
RUN npm run build