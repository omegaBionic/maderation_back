#!/bin/bash

SERVER_PORT=8085

# run detached server
/bin/echo "Server in running..."
/usr/bin/node index.js ${SERVER_PORT}&
/bin/echo "Server is running."

# launch tests
/bin/echo "Mocha test in running..."
./node_modules/.bin/mocha --recursive tests/
RETURN_CODE=$?
/bin/echo "Mocha test in done."

# kill node server
/bin/echo "Server in kill..."
/usr/bin/killall -9 node
/bin/echo "Server killed."

exit ${RETURN_CODE}
