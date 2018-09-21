#!/bin/sh

kubectl create -f db-data-persistentvolumeclaim.yaml,db-deployment.yaml,db-service.yaml,prometheus-claim0-persistentvolumeclaim.yaml,prometheus-deployment.yaml,prometheus-service.yaml,suggestions-deployment.yaml,suggestions-service.yaml
