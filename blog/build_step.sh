#!/bin/bash

echo "Build script"

# add the commands here

npm install && cd .. && cd ./bloglist-frontend && npm install && cd ..
cd ./blog && rm -rf build && cd .. && cd ./bloglist-frontend && npm run build && cp -r build ../blog
