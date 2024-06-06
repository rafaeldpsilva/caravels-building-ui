#!/bin/bash

docker build -t rdpds/caravels-building-ui .
docker tag rdpds/caravels-building-ui rdpds/caravels-building-ui:latest
docker tag rdpds/caravels-building-ui rdpds/caravels-building-ui:v0.1.0
docker push --all-tags rdpds/caravels-building-ui