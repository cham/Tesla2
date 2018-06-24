#!/bin/bash
. ~/.nvm/nvm.sh
./stop.sh

. ./env-production.sh
nvm use
nohup node . --tesla2-process &
