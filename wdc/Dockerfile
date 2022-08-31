FROM node:16.15-slim

WORKDIR /www
COPY /src/package.json /src/package-lock.json /www
RUN npm ci
COPY /src /www
ARG APIURL
ENV APIURL=${APIURL}
RUN npm run build