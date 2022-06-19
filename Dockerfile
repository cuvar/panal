# syntax=docker/dockerfile:1
# FROM node:12.18.1
FROM node:16-alpine3.14
# ENV NODE_ENV=production

RUN mkdir -p /app/ && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node . .
# COPY . .

USER node

RUN npm install
RUN npm run build

EXPOSE 5050

CMD [ "npm", "run", "start" ]