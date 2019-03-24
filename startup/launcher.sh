#!/bin/sh
# launcher.sh
# navigate to home directory, then to this directory, then execute python script, then back home

cd /
cd home/pi/feedtimer/python
python getMac.py & python rtcTime.py & python feedTimer.py & cd ../server ; sudo node app.js

