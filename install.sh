#!/bin/bash
. ~/.nvm/nvm.sh
./stop.sh

nvm install && nvm use && npm install && echo "Install complete"
