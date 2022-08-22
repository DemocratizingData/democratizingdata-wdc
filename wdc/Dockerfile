FROM node:16.15-slim

WORKDIR /www
COPY /src /www
RUN npm ci
RUN npm run build
