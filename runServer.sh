#!/bin/bash

SERVER_PORT=8080


/usr/bin/node index.js ${SERVER_PORT} --max-http-header-size 1000000
