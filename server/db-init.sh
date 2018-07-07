#!/bin/bash

docker_run()
{
  if docker run --name some-mongo -d -v ~/data:/data/db -p 27017:27017 mongo | grep -q RUNNING; then
    echo "Already running"
    echo 1
  else
    echo "Started"
    echo 0
  fi
}

docker_start()
{
  if docker start some-mongo | grep -q RUNNING; then
    echo "Already running"
    echo 1
  else
    echo "Started"
    echo 0
  fi
}

docker_stop()
{
  if docker stop some-mongo | grep -q READY; then
    echo "Not currently Running"
    echo 1
  else
    echo "Stopping..."
    echo 0
  fi
}
