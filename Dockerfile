# syntax=docker/dockerfile:1

FROM node:19.1.0
ENV WAIT_FOR_VER=v2.2.3
ENV NODE_ENV=production
COPY --from=lubien/tired-proxy:2 /tired-proxy /tired-proxy
WORKDIR /app
RUN <<EOF
    apt-get update
    apt-get install -y netcat psmisc 
    wget https://github.com/eficode/wait-for/releases/download/${WAIT_FOR_VER}/wait-for
    chmod +x ./wait-for
EOF
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install

COPY . .
RUN chmod +x scripts/*

EXPOSE 8080
CMD [ "./scripts/start.sh" ]
