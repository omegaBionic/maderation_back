#!/bin/bash

rm -rf out/
jsdoc --verbose --recurse post get index.js
echo "Documentation in: out directory."
