import json
import os


def get():
    fullPath = "/home/pi/feedtimer/server/device_config.json"
    if not os.path.exists(fullPath):
        print("no json file")
    else:
        print("here's a json file")
    #print("my name is readData")
    