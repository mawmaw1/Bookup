#!/bin/bash

BUILD_NUMBER=$1
DOCKER_ID=$2
# stop all running containers
docker stop `docker ps -a | grep ${DOCKER_ID}/bookupback | awk '{print substr ($0, 0, 12)}'`
# remove all of those containers
docker rm `docker ps -a | grep ${DOCKER_ID}/bookupback | awk '{print substr ($0, 0, 12)}'`


docker pull ${DOCKER_ID}/bookupback:${BUILD_NUMBER}
docker run -d -ti -p 8087:8081 --network bookup --name bookupback ${DOCKER_ID}/bookupback:${BUILD_NUMBER}
