#!/bin/bash
TIME_TO_SHUTDOWN="${IDLE_TIME_TO_SHUTDOWN:-60}"
npm run prod &
./wait-for http://localhost:3000/healthz --\
    ./scripts/healthcheck.sh &
/tired-proxy --port 8080 --host http://localhost:3000 --time "${TIME_TO_SHUTDOWN}"
