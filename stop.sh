#!/bin/bash
ps aux | grep -ie tesla2-process | awk '{print $2}' | xargs kill -9
