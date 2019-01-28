import json
import os
from datetime import datetime

class jsonData():
    day2Check = []
    dayStatus = []
    cycleStart = []
    cycleDuration = []
    cycleID = []
    numCycles = 0
    currentCycle = 0

    def cleanDataList(self):
        del jsonData.cycleID[:]
        del jsonData.day2Check[:]
        del jsonData.dayStatus[:]
        del jsonData.cycleStart[:]
        del jsonData.cycleDuration[:]
        jsonData.numCycles = 0

    def jsonData(self):
        fullPath = "/home/pi/feedtimer/server/device_config/device_config.json"
        if not os.path.exists(fullPath):
            print("no json file")
        else:   # if a json file exists
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
                                jsonData.cycleID.append(int(cycle['ID']))
                                jsonData.day2Check.append(str(day['day']))
                                jsonData.cycleStart.append(str(cycle['start']))
                                jsonData.cycleDuration.append(float(cycle['duration']))
                                jsonData.dayStatus.append(status)
                                jsonData.numCycles += 1

                        else:
                            if isinstance(status, unicode) == True: #or type(status) == str:
                                #print("it's unicode")
                                if status == 'true':
                                    #print("it's unicode but true")
                                    jsonData.cycleID.append(int(cycle['ID']))
                                    jsonData.day2Check.append(str(day['day']))
                                    jsonData.cycleStart.append(str(cycle['start']))
                                    jsonData.cycleDuration.append(float(cycle['duration']))
                                    jsonData.dayStatus.append(status)
                                    jsonData.numCycles += 1
                                elif status == 'false':
                                    print("it's unicode but false")
            print("ID: {} \ndays: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(jsonData.cycleID, jsonData.day2Check, jsonData.cycleStart, jsonData.cycleDuration, jsonData.dayStatus, jsonData.numCycles))

    def compareTimes(self, time1, time2):
        FMT = '%H:%M:%S'
        return str(datetime.strptime(time2, FMT) - datetime.strptime(time1, FMT))

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
        #print(currentTime.timeStamp)