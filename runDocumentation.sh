#!/bin/bash

PATHS="post get index.js"
rm -rf out/
jsdoc --verbose --recurse ${PATHS}
echo "Documentation in: out directory."
