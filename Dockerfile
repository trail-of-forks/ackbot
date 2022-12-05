# syntax=docker/dockerfile:1

FROM node:19.1.0
ENV WAIT_FOR_VER=v2.2.3
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
