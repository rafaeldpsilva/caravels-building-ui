#!/bin/bash

docker rmi rdpds/tiocps-building-monitoring-ui:latest
docker build -t rdpds/tiocps-building-monitoring-ui .
id=$(docker images | grep 'rdpds/tiocps-building-monitoring*' | head -1 | awk '{print $3}')
echo "ID: $id"
docker tag $id rdpds/tiocps-building-monitoring-ui:latest
docker push --all-tags rdpds/tiocps-building-monitoring-ui