#!/bin/sh
# launcher.sh
# navigate to home directory, then to this directory, then execute python script, then back home

cd /
cd home/pi/feedtimer/python
python feedTimer.py & cd ../server ; sudo node app.js
