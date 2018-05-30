#!/bin/bash

BUILD_NUMBER=$1
DOCKER_ID=$2
# stop all running containers
docker stop `docker ps -a | grep ${DOCKER_ID}/bookupfront | awk '{print substr ($0, 0, 12)}'`
# remove all of those containers
docker rm `docker ps -a | grep ${DOCKER_ID}/bookupfront | awk '{print substr ($0, 0, 12)}'`


docker pull ${DOCKER_ID}/bookupfront:${BUILD_NUMBER}
docker run -d -ti -p 8085:8080 --network bookup --name bookupfront ${DOCKER_ID}/bookupfront:${BUILD_NUMBER}
