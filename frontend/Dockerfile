FROM node:18.0.0-alpine3.15

WORKDIR /panal
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000