#!/bin/bash
while true; do
    sleep 1
    curl --fail -Ss "http://localhost:3000/healthz" -o /dev/null || killall tired-proxy
done
