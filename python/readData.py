import json
import os
from datetime import datetime

class jsonData():
    day2Check = []
    dayStatus = []
    cycleInit = []
    cycleTime = []
    numCycles = 0

    def cleanDataList(self):
        del jsonData.day2Check[:]
        del jsonData.dayStatus[:]
        del jsonData.cycleInit[:]
        del jsonData.cycleTime[:]
        jsonData.numCycles = 0

    def jsonData(self):
        #global numCycles
        print("classing ")
        fullPath = "/home/pi/feedtimer/server/device_config/device_config.json"
        if not os.path.exists(fullPath):
            print("no json file")
        else:
            print("here's a json file")
            with open(fullPath) as jsonFile:
                data = json.load(jsonFile)
                for day in data['days_of_week']:
                    #print(day['day'])
                    for cycle in day['cycles']:
                        status = cycle['status']
                        if type(status) == bool:
                            #print("it's bool {}".format(status))
                            if status == False:
                                pass
                            else:
                                #print("it's true!")
                                jsonData.day2Check.append(str(day['day']))
                                jsonData.cycleInit.append(str(cycle['start']))
                                jsonData.cycleTime.append(float(cycle['duration']))
                                jsonData.dayStatus.append(status)
                                jsonData.numCycles += 1

                        else:
                            if isinstance(status, unicode) == True: #or type(status) == str:
                                #print("it's unicode")
                                if status == 'true':
                                    #print("it's unicode but true")
                                    jsonData.day2Check.append(str(day['day']))
                                    jsonData.cycleInit.append(str(cycle['start']))
                                    jsonData.cycleTime.append(float(cycle['duration']))
                                    jsonData.dayStatus.append(status)
                                    jsonData.numCycles += 1
                                elif status == 'false':
                                    print("it's unicode but false")
            #print("days: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(day2Check, cycleInit, cycleTime ,dayStatus, numCycles))

class currentTime():
    nameDay = 0
    date = 0
    timeStamp = 0

    def time(self):
        currentTime.nameDay = datetime.now()
        currentTime.nameDay = currentTime.nameDay.strftime("%A")
        currentTime.nameDay = currentTime.nameDay[:3]
        currentTime.date = str(datetime.now())
        currentTime.timeStamp = currentTime.date.split(".")
        currentTime.timeStamp = currentTime.timeStamp[0].split(" ")
        currentTime.date = currentTime.timeStamp[0]
        currentTime.timeStamp = currentTime.timeStamp[1]