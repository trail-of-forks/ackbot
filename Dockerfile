# syntax=docker/dockerfile:1

FROM node:19.1.0
ENV WAIT_FOR_VER=v2.2.3
ENV NODE_ENV=production
COPY --from=lubien/tired-proxy:2 /tired-proxy /tired-proxy
WORKDIR /app
RUN <<EOF
    apt-get update
    apt-get install -y netcat
    wget https://github.com/eficode/wait-for/releases/download/${WAIT_FOR_VER}/wait-for
    chmod +x ./wait-for
EOF
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install

COPY . .
RUN <<EOF
echo '#!/bin/sh' | tee start.sh healthcheck.sh
cat <<EOFH >> healthcheck.sh
while true; do
    sleep 1
    curl --fail  "http://localhost:3000" || bash -c "kill -s 15 -1 && (sleep 1; kill -s 9 -1)"
done
EOFH

cat <<EOFS >> start.sh
TIME_TO_SHUTDOWN="${IDLE_TIME_TO_SHUTDOWN:-60}"
npm run prod &
./wait-for localhost:3000 --\
    ./healthcheck.sh &
/tired-proxy --port 8080 --host http://localhost:3000 --time "\${TIME_TO_SHUTDOWN}"
EOFS
chmod +x start.sh healthcheck.sh
EOF

EXPOSE 8080
CMD [ "./start.sh" ]
