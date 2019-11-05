#!/bin/bash

# run detached server
/bin/echo "Server in running..."
/usr/bin/node index.js&
/bin/echo "Server is running."


# launch tests
/bin/echo "Mocha test in running..."
./node_modules/.bin/mocha tests/mocha.test.js
/bin/echo "Mocha test in done."

# kill node server
/bin/echo "Server in kill..."
/usr/bin/killall -9 node
/bin/echo "Server in killed."
