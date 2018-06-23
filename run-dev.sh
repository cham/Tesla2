#!/bin/bash
. ~/.nvm/nvm.sh
./stop.sh

. ./env-dev.sh
nvm use
node . --tesla2-process
