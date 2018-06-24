#!/bin/bash
. ~/.nvm/nvm.sh
./stop.sh

if command -v nvm > /dev/null; then
  nvm install
  nvm use
  npm install
  echo "Install complete"
  exit 0
else
  echo "Please install nvm before running this script"
  exit 1
fi
